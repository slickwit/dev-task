import type { EditorEvents } from "@tiptap/core";

import { LazyStore } from "@tauri-apps/plugin-store";
import { v4 as uuid } from "uuid";
import { z } from "zod";
import { create } from "zustand";

import { debounceAsync } from "@/lib/debounce";

// ----------------------------------------------------------------------
const tauriFileStore = new LazyStore(".files.dat", { autoSave: 600 });

const debounceSave = debounceAsync(saveFileStorage);

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
	setTabById: (id: string) => void;
	setTab: (index: number) => void;
	closeTab: (id?: string) => void;
	editorUpdate: (editorUpdate: EditorEvents["update"], id: string) => void;
	addFile: (fileName?: string) => boolean;
	updateFileName: (fileName: string, id: string) => Promise<boolean>;
	saveFile: (id?: string) => void;
	saveAll: () => void;
	deleteFile: (id?: string) => void;
}

const defaultState: IFileStoreState = {
	activeTab: null,
	files: [],
	openedTab: [],
	_hasHydrated: false,
};

export const useFileStore = create<IFileStoreState & IFileStoreActions>()((set, get) => ({
	...defaultState,
	setTabById: async (id: string) => {
		const { openedTab, files } = get();
		const inOpenTab = openedTab.find(f => f.id === id);
		if (inOpenTab) {
			set({
				activeTab: inOpenTab,
			});
			await tauriFileStore.set("activeTab", inOpenTab);
		}
		else {
			const file = files.find(f => f.id === id);
			if (file) {
				set({
					activeTab: file,
					openedTab: [...openedTab, file],
				});
				await tauriFileStore.set("activeTab", file);
			}
		}
	},
	setTab: async (index: number) => {
		const { openedTab } = get();
		const selectedTab = openedTab[index];
		if (selectedTab) {
			set({
				activeTab: selectedTab,
			});
		}
	},
	closeTab: async (id?: string) => {
		const { openedTab, activeTab, files } = get();
		const selectedTabId = id ?? activeTab?.id;
		const closedIndex = openedTab.findIndex(file => file.id === selectedTabId);
		const selectedTab = openedTab[closedIndex];
		const filteredTab = openedTab.filter(f => f.id !== selectedTabId);

		if (!selectedTab.fileName && selectedTab.content === "" && selectedTab.saved) {
			const updatedFiles = files.filter(f => f.id !== selectedTab.id);
			set({ files: updatedFiles });
			await tauriFileStore.set("files", updatedFiles);
		}

		const newActiveTab = id && id !== activeTab?.id ? activeTab : filteredTab[closedIndex] ?? filteredTab[closedIndex - 1] ?? null;
		if (closedIndex !== -1) {
			set({
				activeTab: newActiveTab,
				openedTab: filteredTab,
			});
		}
		await Promise.all([tauriFileStore.set("openedTab", filteredTab), tauriFileStore.set("activeTab", newActiveTab)]);
	},
	editorUpdate: ({ editor }: EditorEvents["update"], id: string) => {
		const { openedTab, files, activeTab } = get();
		const content = editor.getHTML();

		const updatedOpenedTab = openedTab.map((file) => {
			if (file.id === id) {
				return {
					...file,
					content,
					saved: false,
				};
			}
			return file;
		});
		const updatedFiles = files.map(f => (f.id === id ? { ...f, content, saved: false } : f));
		set({
			openedTab: updatedOpenedTab,
			files: updatedFiles,
		});
		const updatedActiveTab = activeTab ? { ...activeTab, content, saved: false } : null;
		debounceSave({ activeTab: updatedActiveTab, openedTab: updatedOpenedTab, files: updatedFiles });
	},
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
			content: "",
			saved: true,
			createdAt: new Date().getTime(),
			updatedAt: null,
		};
		set(state => ({
			activeTab: newFile,
			files: [...state.files, newFile],
			openedTab: [...state.openedTab, newFile],
		}));
		return true;
	},
	updateFileName: async (fileName, id) => {
		if (fileName && id) {
			const { files, activeTab, openedTab } = get();
			const exist = files.some(f => f.fileName === fileName);
			if (exist)
				return false;
			const updatedFiles = files.map(f => (f.id === id ? { ...f, fileName, updatedAt: new Date().getTime() } : f));
			const updatedOpenedTab = openedTab.map(f => (f.id === id ? { ...f, fileName, updatedAt: new Date().getTime() } : f));
			const updatedActiveTab = activeTab?.id === id ? { ...activeTab, fileName, updatedAt: new Date().getTime() } : activeTab;
			set({
				files: updatedFiles,
				openedTab: updatedOpenedTab,
				activeTab: updatedActiveTab,
			});
			await saveFileStorage({ files: updatedFiles, openedTab: updatedOpenedTab, activeTab: updatedActiveTab });
			return true;
		}
		return false;
	},
	saveFile: async (id?: string) => {
		if (id) {
			const { files, openedTab, activeTab } = get();
			const newFiles = files.filter(f => f.id !== id);
			const newOpenedTab = openedTab.map((f) => {
				if (f.id === id) {
					const u = {
						...f,
						saved: true,
					};
					newFiles.push(u);
					return u;
				}
				return f;
			});
			const newState: z.infer<typeof fileStoreSchema> = {
				activeTab: activeTab?.id === id ? { ...activeTab, saved: true } : null,
				files: newFiles,
				openedTab: newOpenedTab,
			};
			set(newState);
			await saveFileStorage(newState);
		}
	},
	saveAll: async () => {
		const { files, openedTab, activeTab } = get();
		const updatedState = {
			files: files.map(f => ({ ...f, saved: true })),
			openedTab: openedTab.map(f => ({ ...f, saved: true })),
			activeTab: activeTab ? { ...activeTab, saved: true } : null,
		};
		set(updatedState);
		await saveFileStorage(updatedState);
	},
	deleteFile: async (id?: string) => {
		const { files, openedTab, activeTab } = get();
		const selId = id ?? activeTab?.id;
		const updatedState: z.infer<typeof fileStoreSchema> = {
			files: files.filter(f => f.id !== selId),
			openedTab: openedTab.filter(f => f.id !== selId),
			activeTab: id === activeTab?.id ? null : activeTab,
		};
		set(updatedState);
		await saveFileStorage(updatedState);
	},
}));

(async function () {
	// await tauriFileStore.clear();
	const [unParsedFiles, unParsedActiveTab, unParsedOpenedTab] = await Promise.all([
		tauriFileStore.get("files"),
		tauriFileStore.get("activeTab"),
		tauriFileStore.get("openedTab"),
	]);

	if (unParsedFiles) {
		const parsedFiles = fileStoreSchema.pick({ files: true }).parse({
			files: unParsedFiles,
			activeTab: unParsedActiveTab ?? null,
			openedTab: unParsedOpenedTab ?? [],
		});
		const parsedActiveTab = unParsedActiveTab === null ? null : fileSchema.parse(unParsedActiveTab);
		const parsedOpenedTab = fileStoreSchema.pick({ openedTab: true }).parse({ openedTab: unParsedOpenedTab ?? [] });
		const inOpenedTab = parsedOpenedTab.openedTab.some(f => f.id === parsedActiveTab?.id);
		if (!inOpenedTab) {
			const file = parsedFiles.files.find(f => f.id === parsedActiveTab?.id);
			if (file) {
				parsedOpenedTab.openedTab.push(file);
			}
		}
		const parsedData: z.infer<typeof fileStoreSchema> = {
			activeTab: parsedActiveTab,
			files: parsedFiles.files,
			openedTab: parsedOpenedTab.openedTab,
		};

		useFileStore.setState(parsedData);
	}
	else {
		const defValue: TFile = {
			fileName: null,
			id: uuid(),
			content: "",
			saved: true,
			createdAt: new Date().getTime(),
			updatedAt: null,
		};
		const defaultStoreValue: z.infer<typeof fileStoreSchema> = {
			activeTab: defValue,
			files: [defValue],
			openedTab: [defValue],
		};

		useFileStore.setState({ ...defaultStoreValue });
		await Promise.all([
			tauriFileStore.set("files", defaultStoreValue.files),
			tauriFileStore.set("openedTab", defaultStoreValue.openedTab),
			tauriFileStore.set("activeTab", defaultStoreValue.activeTab),
		]);
	}

	useFileStore.setState({ _hasHydrated: true });
})();

async function saveFileStorage({ files, openedTab, activeTab }: z.infer<typeof fileStoreSchema>) {
	await Promise.all([
		tauriFileStore.set("files", files),
		tauriFileStore.set("openedTab", openedTab),
		tauriFileStore.set("activeTab", activeTab),
		tauriFileStore.save(),
	]);
}
