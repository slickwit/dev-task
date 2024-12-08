import type { EditorEvents } from "@tiptap/core";

import { LazyStore } from "@tauri-apps/plugin-store";
import { z } from "zod";
import { create } from "zustand";

// ----------------------------------------------------------------------
const tauriTodoStore = new LazyStore(".todos.dat", { autoSave: 600 });

const todoSchema = z.object({
	content: z.string(),
	createdAt: z.number(),
	updatedAt: z.number().nullable(),
});

interface ITodoState extends z.infer<typeof todoSchema> { _hasHydrated: boolean };

interface ITodoAction {
	editorUpdate: (editorUpdate: EditorEvents["update"]) => void;
}

const defaultState: ITodoState = {
	content: "",
	createdAt: new Date().getTime(),
	updatedAt: null,
	_hasHydrated: false,
};

export const useTodoStore = create<ITodoState & ITodoAction>()((set, get) => ({
	...defaultState,
	editorUpdate: async ({ editor }) => {
		const state = get();
		const content = editor.getHTML();
		const updatedState = {
			content,
			updatedAt: new Date().getTime(),
		};
		set(updatedState);
		await tauriTodoStore.set("todos", { ...state, ...updatedState });
	},
}));

(async function () {
	const unparsedTodos = await tauriTodoStore.get("todos");
	if (unparsedTodos) {
		const parsedTodo = todoSchema.safeParse(unparsedTodos);
		if (parsedTodo.data) {
			useTodoStore.setState(parsedTodo.data);
		}
	}
	else {
		const defaultVal: z.infer<typeof todoSchema> = {
			content: `<ul data-type="taskList"><li data-type="taskItem" data-checked="false">First Item</li></ul>`,
			createdAt: new Date().getTime(),
			updatedAt: null,
		};
		useTodoStore.setState(defaultVal);
	}
	useTodoStore.setState({ _hasHydrated: true });
})();
