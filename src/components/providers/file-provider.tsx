import * as React from 'react';

import NewFile from '@/components/dialogs/new-file';
import { useBoolean } from '@/hooks/use-boolean';
import { useEventListener } from '@/hooks/use-event-listener';
import { useFileStore } from '@/store/file.store';

// ----------------------------------------------------------------------

interface IFileContext {
  newFileOpen: boolean;
  newFileClose: () => void;
  editorDetailOpen: boolean;
  editorDetailToggle: () => void;
}

const FileContext = React.createContext<IFileContext | null>(null);

function useFileContext() {
  const context = React.useContext(FileContext);
  if (!context) {
    throw new Error('useFileContextr must be used within a FileProvider.');
  }
  return context;
}

function FileProvider({ children }: { children?: React.ReactNode }) {
  const showMenu = useBoolean(false);
  const hydrated = useFileStore(state => state._hasHydrated);
  const activeTab = useFileStore(state => state.activeTab);
  const addFile = useFileStore(state => state.addFile);
  const closeTab = useFileStore(state => state.closeTab);
  const saveFile = useFileStore(state => state.saveFile);

  const newFileDialog = useBoolean(false);

  useEventListener('keydown', (e: KeyboardEvent) => {
    if (e.metaKey || e.ctrlKey) {
      switch (e.key) {
        case 'n':
          e.preventDefault();
          addFile();
          break;
        case 'w':
          e.preventDefault();
          closeTab();
          break;
        case 's':
          saveFile(activeTab?.id);
          break;
        default:
          break;
      }
    }
  });

  if (!hydrated)
    return null;

  return (
    <FileContext.Provider value={{ newFileOpen: newFileDialog.value, newFileClose: newFileDialog.onFalse, editorDetailOpen: showMenu.value, editorDetailToggle: showMenu.onToggle }}>
      {children}
      <NewFile open={newFileDialog.value} onClose={newFileDialog.onFalse} />
    </FileContext.Provider>
  );
}

export { FileProvider, useFileContext };
