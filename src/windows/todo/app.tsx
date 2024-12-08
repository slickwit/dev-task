import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import "./tiptap.css";
import { useTodoStore } from "@/store/todo.store";

// ----------------------------------------------------------------------

export default function App() {
	const editorUpdate = useTodoStore(state => state.editorUpdate);
	const content = useTodoStore(state => state.content);
	const editor = useEditor({
		extensions: [StarterKit, TaskList, TaskItem.extend({
			content: "inline*",
		})],
		content,
		editorProps: {
			attributes: {
				class: "px-4 py-2 focus:outline-none !absolute inset-0 h-full w-full text-sm",
			},
		},
		enableContentCheck: false,
		shouldRerenderOnTransaction: false,
		immediatelyRender: true,
		autofocus: "end",
		onUpdate: editorUpdate,
	});
	return (
		<div className="min-h-svh h-full flex flex-col">
			<h1 className="text-center text-lg font-bold mt-1">Todo List:</h1>
			<EditorContent editor={editor} className="flex-1 relative" spellCheck={false} />
		</div>
	);
}
