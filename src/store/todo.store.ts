import type { EditorEvents } from "@tiptap/core";

import { LazyStore } from "@tauri-apps/plugin-store";
import { z } from "zod";
import { create } from "zustand";

// ----------------------------------------------------------------------
const tauriTodoStore = new LazyStore(".todos.dat", { autoSave: 600 });

const todoSchema = z.array(z.object({
	todo: z.string(),
	completed: z.boolean(),
}));

interface ITodoState {
	todos: z.infer<typeof todoSchema>;
	_hasHydrated: boolean;
};

interface ITodoAction {
	editorUpdate: (editorUpdate: EditorEvents["update"]) => void;
	quickAdd: (todo: string, completed: boolean) => void;
	addMultiple: (todos: { todo: string; completed: boolean }[]) => void;
}

const defaultState: ITodoState = {
	todos: [],
	_hasHydrated: false,
};

export const useTodoStore = create<ITodoState & ITodoAction>()((set, get) => ({
	...defaultState,
	editorUpdate: async ({ editor }) => {
		const jsonContent = editor.getJSON().content;
		const taskList = jsonContent?.[0];
		if (taskList && taskList.content) {
			const newTodos: z.infer<typeof todoSchema> = taskList.content.map(({ attrs, content }) => ({
				todo: content?.[0]?.text ?? "",
				completed: attrs?.checked ?? false,
			}));
			set({ todos: newTodos });
			await tauriTodoStore.set("todos", newTodos);
		}
	},
	quickAdd: async (todo, completed) => {
		const state = get();
		set({
			todos: [...state.todos, { completed, todo }],
		});
		await tauriTodoStore.set("todos", [...state.todos, { completed, content: todo }]);
	},
	addMultiple: async (todos) => {
		const todoState = get().todos;
		const newTodos = [...todoState, ...todos];
		set({
			todos: newTodos,
		});
		await tauriTodoStore.set("todos", newTodos);
	},
}));

(async function () {
	// await tauriTodoStore.clear();
	const unparsedTodos = await tauriTodoStore.get("todos");
	if (unparsedTodos) {
		const parsedTodo = todoSchema.safeParse(unparsedTodos);
		if (parsedTodo.data) {
			useTodoStore.setState({ todos: parsedTodo.data });
		}
	}
	else {
		const defaultVal: z.infer<typeof todoSchema> = [{
			todo: "First Item",
			completed: false,
		}];
		useTodoStore.setState({ todos: defaultVal });
	}
	useTodoStore.setState({ _hasHydrated: true });
})();
