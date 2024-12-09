import { useCurrentEditor } from "@tiptap/react";
import { useState } from "react";

import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut } from "@/components/ui/context-menu";
import { useFileStore } from "@/store/file.store";

import QuickAddTodo from "../dialogs/quick-add-todo";

// ----------------------------------------------------------------------

export default function EditorContextMenuContent() {
	const [openTodo, setOpenTodo] = useState(false);
	const addFile = useFileStore(state => state.addFile);
	const closeTab = useFileStore(state => state.closeTab);
	const { editor } = useCurrentEditor();

	if (!editor)
		return null;

	return (
		<>
			<ContextMenuContent className="w-64">
				<ContextMenuItem
					inset
					onClick={() => {
						addFile();
					}}
				>
					New Tab
					<ContextMenuShortcut>⌘T</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuItem
					inset
					onClick={() => {
						location?.reload();
					}}
				>
					Reload
					<ContextMenuShortcut>⌘R</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuItem inset onClick={() => closeTab()}>
					Close
					<ContextMenuShortcut>⌘W</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuItem inset onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
					Code Block
					<ContextMenuShortcut>⌘ Alt C</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuItem inset onClick={() => { setOpenTodo(true); }}>
					Quick Add Todo
				</ContextMenuItem>
				<ContextMenuSeparator />
				<ContextMenuItem
					inset
					disabled={
						!editor.can()
							.chain()
							.focus()
							.undo()
							.run()
					}
					onClick={() => editor.chain().focus().undo().run()}
				>
					Undo
					<ContextMenuShortcut>⌘Z</ContextMenuShortcut>
				</ContextMenuItem>
				<ContextMenuItem
					inset
					disabled={
						!editor.can()
							.chain()
							.focus()
							.redo()
							.run()
					}
					onClick={() => editor.chain().focus().redo().run()}
				>
					Redo
					<ContextMenuShortcut>⌘Y</ContextMenuShortcut>
				</ContextMenuItem>
			</ContextMenuContent>
			<QuickAddTodo open={openTodo} onClose={() => { setOpenTodo(false); }} />
		</>
	);
}
