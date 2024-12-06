import type { EditorEvents } from '@tiptap/core';

import { LazyStore } from '@tauri-apps/plugin-store';
import { v4 as uuid } from 'uuid';
import { z } from 'zod';
import { create } from 'zustand';

import { debounceAsync } from '@/lib/debounce';

// ----------------------------------------------------------------------
const tauriFileStore = new LazyStore('.files.dat', { autoSave: true });

const debounceSaveCache = debounceAsync(saveCache);

const fileSchema = z.object({
  id: z.string().min(1),
  fileName: z.string().nullable(),
  content: z.string(),
  saved: z.boolean(),
  createdAt: z.number(),
  updatedAt: z.number().nullable(),
});

const fileStoreSchema = z.object({
  activeTab: fileSchema.nullable(),
  openedTab: z.array(fileSchema),
  files: z.array(fileSchema),
});

export type TFile = z.infer<typeof fileSchema>;

interface IFileStoreState extends z.infer<typeof fileStoreSchema> {
  _hasHydrated: boolean;
}

interface IFileStoreActions {
  addFile: (fileName?: string) => boolean;
  setTab: (id: string) => void;
  closeTab: (id?: string) => void;
  editorUpdate: (editorUpdate: EditorEvents['update'], id: string) => void;
  saveFile: (id?: string) => void;
}

const defaultState: IFileStoreState = {
  activeTab: null,
  files: [],
  openedTab: [],
  _hasHydrated: false,
};

export const useFileStore = create<IFileStoreState & IFileStoreActions>()((set, get) => ({
  ...defaultState,
  addFile: (fileName) => {
    if (fileName) {
      const exist = get().files.some(f => f.fileName === fileName);
      if (exist)
        return false;
    }
    const newFileName = fileName ?? null;
    const newFile: TFile = {
      id: uuid(),
      fileName: newFileName,
      content: '',
      saved: false,
      createdAt: (new Date()).getTime(),
      updatedAt: null,
    };
    set(state => ({
      activeTab: newFile,
      files: [...state.files, newFile],
      openedTab: [...state.openedTab, newFile],
    }));
    return true;
  },
  setTab: (id: string) => {
    set({
      activeTab: get().openedTab.find(f => f.id === id),
    });
  },
  closeTab: async (id?: string) => {
    const { openedTab, activeTab } = get();
    const selectedTabId = id ?? activeTab?.id;
    const closedIndex = openedTab.findIndex(file => file.id === selectedTabId);
    const filteredTab = openedTab.filter(f => f.id !== selectedTabId);
    const newActiveTab = id && id !== activeTab?.id ? activeTab : filteredTab[closedIndex] ?? filteredTab[closedIndex - 1] ?? null;
    if (closedIndex !== -1) {
      set({
        activeTab: newActiveTab,
        openedTab: filteredTab,
      });
    }
    await Promise.all([
      tauriFileStore.set('openedTab', filteredTab),
      tauriFileStore.set('activeTab', newActiveTab),
    ]);
  },
  editorUpdate: ({ editor }: EditorEvents['update'], id: string) => {
    const openedTab = get().openedTab;
    const content = editor.getHTML();

    const newOpenedTab = openedTab.map((file) => {
      if (file.id === id) {
        return {
          ...file,
          content,
          saved: false,
        };
      }
      return file;
    });
    set({
      openedTab: newOpenedTab,
    });
    debounceSaveCache({ openedTab: newOpenedTab });
  },
  saveFile: async (id?: string) => {
    if (id) {
      const { files, openedTab, activeTab } = get();
      const newState: Omit<IFileStoreState, '_hasHydrated'> = {
        activeTab: activeTab?.id === id ? { ...activeTab, saved: true } : null,
        files: files.map((f) => {
          if (f.id === id) {
            return {
              ...f,
              saved: true,
            };
          }
          return f;
        }),
        openedTab: openedTab.map((f) => {
          if (f.id === id) {
            return {
              ...f,
              saved: true,
            };
          }
          return f;
        }),
      };
      set({ ...newState });
      await Promise.all([
        tauriFileStore.set('files', newState.files),
        tauriFileStore.set('openedTab', newState.openedTab),
        tauriFileStore.set('activeTab', newState.activeTab),
      ]);
    }
  },
}));

(async function () {
  // await tauriFileStore.clear();
  const [unParsedFiles, unParsedActiveTab, unParsedOpenedTab] = await Promise.all([
    tauriFileStore.get('files'),
    tauriFileStore.get('activeTab'),
    tauriFileStore.get('openedTab'),
  ]);

  if (unParsedFiles) {
    const parsedData = fileStoreSchema.parse({
      activeTab: unParsedActiveTab ?? null,
      files: unParsedFiles,
      openedTab: unParsedOpenedTab ?? [],
    });
    useFileStore.setState(parsedData);
  }
  else {
    const defValue: TFile = {
      fileName: null,
      id: uuid(),
      content: '',
      saved: false,
      createdAt: new Date().getTime(),
      updatedAt: null,
    };
    const defaultStoreValue: Omit<IFileStoreState, '_hasHydrated'> = {
      activeTab: defValue,
      files: [defValue],
      openedTab: [defValue],
    };

    useFileStore.setState({ ...defaultStoreValue });
    await Promise.all([
      tauriFileStore.set('files', defaultStoreValue.files),
      tauriFileStore.set('openedTab', defaultStoreValue.openedTab),
      tauriFileStore.set('activeTab', defaultStoreValue.activeTab),
    ]);
  }

  useFileStore.setState({ _hasHydrated: true });
})();

async function saveCache({ openedTab }: { openedTab: TFile[] }) {
  await tauriFileStore.set('openedTab', openedTab);
}
