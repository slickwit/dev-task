import { Code, Globe, Mic } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';
import { appWindow } from '@/lib/tauri';

import ThemeToggle from './theme-toggle';
import WindowsControls from './windows-controls';

// ----------------------------------------------------------------------

export default function Menu() {
  const [isMaximized, setIsMaximized] = useState(false);

  const checkWindow = async () => {
    const isMax = await appWindow.isMaximized();
    setIsMaximized(isMax);
  };

  useEffect(() => {
    checkWindow();
  }, []);

  const closeWindow = useCallback(async () => {
    appWindow.close();
  }, []);

  return (
    <>
      <header
        className="fixed z-50 h-10 flex w-full items-center justify-between border-b bg-background titlebar px-0.5"
        data-tauri-drag-region
        onMouseDown={async (e) => {
          if (e.buttons === 1 && e.detail === 2) {
            const isMax = await appWindow.isMaximized();
            setIsMaximized(!isMax);
          }
        }}
      >
        <Menubar className="rounded-none h-auto border-0 p-0">
          <MenubarMenu>
            <MenubarTrigger className="font-bold text-cyan-500">
              <Code className="mr-1 h-3.5 w-4" />
              <h4 className="text-xs font-bold">DevTask~</h4>
            </MenubarTrigger>
            {/* <Dialog modal={false}> */}
            <MenubarContent>
              {/* <DialogTrigger asChild> */}
              <MenubarItem className="text-xs">About App</MenubarItem>
              {/* </DialogTrigger> */}

              <MenubarSeparator />
              <MenubarItem className="text-xs">
                Preferences...
                <MenubarShortcut>⌘,</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem className="text-xs">
                Hide Music...
                <MenubarShortcut>⌘H</MenubarShortcut>
              </MenubarItem>
              <MenubarItem className="text-xs">
                Hide Others...
                <MenubarShortcut>⇧⌘H</MenubarShortcut>
              </MenubarItem>
              <MenubarShortcut />
              <MenubarItem className="text-xs" onClick={closeWindow}>
                Quit
                <MenubarShortcut>⌘Q</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
            {/* <AboutDialog /> */}
            {/* </Dialog> */}
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger className="relative">File</MenubarTrigger>
            {/* <Dialog open={openNewFolder} onOpenChange={setOpenNewFolder}>
            <MenubarContent>
              <DialogTrigger className="w-full">
                <MenubarItem>New Folder</MenubarItem>
              </DialogTrigger>
              <MenubarItem>
                Open Stream URL... <MenubarShortcut>⌘U</MenubarShortcut>
              </MenubarItem>
              <MenubarItem>
                Close Window <MenubarShortcut>⌘W</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarSub>
                <MenubarSubTrigger>Library</MenubarSubTrigger>
                <MenubarSubContent>
                  <MenubarItem>Update Cloud Library</MenubarItem>
                  <MenubarItem>Update Genius</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Organize Library...</MenubarItem>
                  <MenubarItem>Export Library...</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Import Playlist...</MenubarItem>
                  <MenubarItem disabled>Export Playlist...</MenubarItem>
                  <MenubarItem>Show Duplicate Items</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Get Album Artwork</MenubarItem>
                  <MenubarItem disabled>Get Track Names</MenubarItem>
                </MenubarSubContent>
              </MenubarSub>
              <MenubarItem>
                Import... <MenubarShortcut>⌘O</MenubarShortcut>
              </MenubarItem>
              <MenubarItem disabled>Burn Playlist to Disc...</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>
                Show in Finder <MenubarShortcut>⇧⌘R</MenubarShortcut>{" "}
              </MenubarItem>
              <MenubarItem>Convert</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Page Setup...</MenubarItem>
              <MenubarItem disabled>
                Print... <MenubarShortcut>⌘P</MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
            <NewFolderDialog setOpen={setOpenNewFolder} />
          </Dialog> */}
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Edit</MenubarTrigger>
            <MenubarContent>
              <MenubarItem className="text-xs" disabled>
                Undo
                {' '}
                <MenubarShortcut>⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarItem className="text-xs" disabled>
                Redo
                {' '}
                <MenubarShortcut>⇧⌘Z</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem className="text-xs" disabled>
                Cut
                {' '}
                <MenubarShortcut>⌘X</MenubarShortcut>
              </MenubarItem>
              <MenubarItem className="text-xs" disabled>
                Copy
                {' '}
                <MenubarShortcut>⌘C</MenubarShortcut>
              </MenubarItem>
              <MenubarItem className="text-xs" disabled>
                Paste
                {' '}
                <MenubarShortcut>⌘V</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem className="text-xs">
                Select All
                {' '}
                <MenubarShortcut>⌘A</MenubarShortcut>
              </MenubarItem>
              <MenubarItem className="text-xs" disabled>
                Deselect All
                {' '}
                <MenubarShortcut>⇧⌘A</MenubarShortcut>
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem className="text-xs">
                Smart Dictation...
                {' '}
                <MenubarShortcut>
                  <Mic className="h-4 w-4" />
                </MenubarShortcut>
              </MenubarItem>
              <MenubarItem className="text-xs">
                Emoji & Symbols
                {' '}
                <MenubarShortcut>
                  <Globe className="h-4 w-4" />
                </MenubarShortcut>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarCheckboxItem className="text-xs">Show Playing Next</MenubarCheckboxItem>
              <MenubarCheckboxItem className="text-xs" checked>Show Lyrics</MenubarCheckboxItem>
              <MenubarSeparator />
              <MenubarItem className="text-xs" inset disabled>
                Show Status Bar
              </MenubarItem>
              <MenubarSeparator />
              <MenubarItem className="text-xs" inset>Hide Sidebar</MenubarItem>
              <MenubarItem className="text-xs" disabled inset>
                Enter Full Screen
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Account</MenubarTrigger>
            <MenubarContent forceMount>
              <MenubarLabel inset className="text-xs">Switch Account</MenubarLabel>
              <MenubarSeparator />
              <MenubarRadioGroup value="benoit">
                <MenubarRadioItem className="text-xs" value="andy">Andy</MenubarRadioItem>
                <MenubarRadioItem className="text-xs" value="benoit">Benoit</MenubarRadioItem>
                <MenubarRadioItem className="text-xs" value="Luis">Luis</MenubarRadioItem>
              </MenubarRadioGroup>
              <MenubarSeparator />
              <MenubarItem className="text-xs" inset>Manage Famliy...</MenubarItem>
              <MenubarSeparator />
              <MenubarItem className="text-xs" inset>Add Account...</MenubarItem>
            </MenubarContent>
          </MenubarMenu>

          <ThemeToggle />
        </Menubar>
        <WindowsControls isMaximized={isMaximized} setIsMaximized={setIsMaximized} />
      </header>
      <div className="h-10" />
    </>
  );
}
