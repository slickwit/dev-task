import React from "react";
import ReactDOM from "react-dom/client";

import ThemeProvider from "@/components/providers/theme-provider";

import App from "./App";
import Layout from "./layout";
import "./globals.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<Layout>
				<App />
			</Layout>
		</ThemeProvider>
	</React.StrictMode>,
);
