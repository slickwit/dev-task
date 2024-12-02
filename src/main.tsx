import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import "./globals.css";
import Layout from "./layout";
import ThemeProvider from "@/components/theme-provider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<Layout>
				<App />
			</Layout>
		</ThemeProvider>
	</React.StrictMode>,
);
