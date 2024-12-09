import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";

import "./tiptap.css";

import { RotateCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTodoStore } from "@/store/todo.store";

// ----------------------------------------------------------------------

const CustomDocument = Document.extend({
	content: "taskList",
});

const CustomTaskItem = TaskItem.extend({
	content: "inline*",
});

export default function App() {
	const editorUpdate = useTodoStore(state => state.editorUpdate);
	const todos = useTodoStore(state => state.todos);
	const editor = useEditor({
		extensions: [CustomDocument, Paragraph, Text, TaskList, CustomTaskItem],
		content: `
		<ul data-type="taskList">
			${todos.map(todo => `<li data-type="taskItem" data-checked="${todo.completed}">${todo.todo}</li>`).join(" ")}
		</ul>
		`,
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
			<div className="relative">
				<h1 className="text-center text-lg font-bold mt-1">Todo List:</h1>
				<Button
					onClick={() => {
						location?.reload();
					}}
					className="size-6 [&_svg]:size-3.5 absolute top-1 right-1"
					variant="ghost"
					size="icon"
					title="Refresh"
				><RotateCw />
				</Button>
			</div>
			<EditorContent editor={editor} className="flex-1 relative" spellCheck={false} />
		</div>
	);
}
