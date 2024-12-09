import React from "react";
import ReactDOM from "react-dom/client";

import LayoutProvider from "@/components/providers/layout-provider";

import "../../globals.css";

import ThemeProvider from "@/components/providers/theme-provider";
import { useTodoStore } from "@/store/todo.store";

import App from "./app";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<TodoProvider />
		</ThemeProvider>
	</React.StrictMode>,
);

function TodoProvider() {
	const hydrated = useTodoStore(state => state._hasHydrated);
	if (!hydrated)
		return null;
	return (
		<LayoutProvider>
			<App />
		</LayoutProvider>
	);
}
