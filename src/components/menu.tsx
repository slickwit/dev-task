import { invoke } from "@tauri-apps/api/core";
import { Code, ExternalLink, Globe, Mic } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from "@/components/ui/menubar";
import { appWindow } from "@/lib/tauri";
import { useFileStore } from "@/store/file.store";

import ThemeToggle from "./menu-theme";
import { Button } from "./ui/button";
import WindowsControls from "./windows-controls";

// ----------------------------------------------------------------------

export default function Menu() {
	const addFile = useFileStore(state => state.addFile);
	const saveFile = useFileStore(state => state.saveFile);
	const saveAll = useFileStore(state => state.saveAll);
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

	const handleOpenTodo = async () => {
		await invoke("todo_create_window");
	};

	return (
		<>
			<header
				className="fixed z-50 h-9 flex w-full items-center justify-between border-b bg-background titlebar px-0.5"
				data-tauri-drag-region
				onMouseDown={async (e) => {
					if (e.buttons === 1 && e.detail === 2) {
						const isMax = await appWindow.isMaximized();
						setIsMaximized(!isMax);
					}
				}}
			>
				<Menubar className="rounded-none border-0 p-0 shadow-none bg-transparent [&>button]:h-9 gap-0">
					<MenubarMenu>
						<MenubarTrigger className="font-bold text-primary rounded-none h-9">
							<Code className="mr-1 h-3.5 w-4" />
							<h4 className="text-xs font-bold">DevTask~</h4>
						</MenubarTrigger>
						<MenubarContent sideOffset={0} className="rounded-sm">
							<MenubarItem className="text-xs" disabled>About App</MenubarItem>
							<MenubarSeparator />
							<MenubarItem className="text-xs" onClick={closeWindow}>
								Quit
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger className="relative rounded-none">File</MenubarTrigger>
						<MenubarContent sideOffset={0} className="rounded-sm">
							<MenubarItem className="text-xs" onClick={() => addFile()}>
								New Tab <MenubarShortcut>⌘T</MenubarShortcut>
							</MenubarItem>
							<MenubarItem className="text-xs" disabled>
								Quick Add Todo
							</MenubarItem>
							<MenubarSeparator />
							<MenubarItem
								className="text-xs"
								onClick={() => {
									saveFile();
								}}
							>
								Save <MenubarShortcut>⌘S</MenubarShortcut>
							</MenubarItem>
							<MenubarItem className="text-xs" onClick={() => { saveAll(); }}>
								Save All <MenubarShortcut>⌘+Shift+S</MenubarShortcut>
							</MenubarItem>
							<MenubarSeparator />
							<MenubarItem className="text-xs" disabled>
								Import
							</MenubarItem>
							<MenubarItem className="text-xs" disabled>
								Export
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>
					<MenubarMenu>
						<MenubarTrigger className="rounded-none">Edit</MenubarTrigger>
						<MenubarContent sideOffset={0} className="rounded-sm">
							<MenubarItem className="text-xs" disabled>
								Undo <MenubarShortcut>⌘Z</MenubarShortcut>
							</MenubarItem>
							<MenubarItem className="text-xs" disabled>
								Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
							</MenubarItem>
							<MenubarSeparator />
							<MenubarItem className="text-xs" disabled>
								Cut <MenubarShortcut>⌘X</MenubarShortcut>
							</MenubarItem>
							<MenubarItem className="text-xs" disabled>
								Copy <MenubarShortcut>⌘C</MenubarShortcut>
							</MenubarItem>
							<MenubarItem className="text-xs" disabled>
								Paste <MenubarShortcut>⌘V</MenubarShortcut>
							</MenubarItem>
							<MenubarSeparator />
							<MenubarItem className="text-xs" disabled>
								Select All <MenubarShortcut>⌘A</MenubarShortcut>
							</MenubarItem>
							<MenubarItem className="text-xs" disabled>
								Deselect All <MenubarShortcut>⇧⌘A</MenubarShortcut>
							</MenubarItem>
							<MenubarSeparator />
							<MenubarItem className="text-xs" disabled>
								Smart Dictation...{" "}
								<MenubarShortcut>
									<Mic className="h-4 w-4" />
								</MenubarShortcut>
							</MenubarItem>
							<MenubarItem className="text-xs" disabled>
								Emoji & Symbols{" "}
								<MenubarShortcut>
									<Globe className="h-4 w-4" />
								</MenubarShortcut>
							</MenubarItem>
						</MenubarContent>
					</MenubarMenu>

					<ThemeToggle />
				</Menubar>
				<div className="flex items-center gap-x-6">
					<Button variant="ghost" onClick={handleOpenTodo} className="rounded-none text-sm px-3 py-1 border-b bg-primary/15 hover:bg-secondary">Todo List <ExternalLink /></Button>
					<WindowsControls isMaximized={isMaximized} setIsMaximized={setIsMaximized} />
				</div>
			</header>
			<div className="h-9" />
		</>
	);
}
