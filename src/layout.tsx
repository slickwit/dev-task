import AppSidebar from "@/components/app-sidebar";
import Menu from "@/components/menu";
import { SidebarProvider } from "@/components/ui/sidebar";

import LayoutProvider from "./components/providers/layout-provider";

// ----------------------------------------------------------------------

interface LayoutProps {
	children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<LayoutProvider>
			<SidebarProvider>
				<div className="min-h-svh w-full">
					<Menu />
					<div className="flex w-full">
						<AppSidebar />
						<main className="w-full">
							{children}
						</main>
					</div>
				</div>
			</SidebarProvider>
		</LayoutProvider>
	);
}
