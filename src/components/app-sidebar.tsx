import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { File, Plus } from "lucide-react";
import { useState } from "react";

import BuyMeCoffeImage from "@/assets/bmc-button.png";
import NewUpdateFile from "@/components/dialogs/new-update-file";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useBoolean } from "@/hooks/use-boolean";
import { useFileStore } from "@/store/file.store";

export default function AppSidebar() {
	const activeTab = useFileStore(state => state.activeTab);
	const files = useFileStore(state => state.files);
	const setTabById = useFileStore(state => state.setTabById);
	const deleteFile = useFileStore(state => state.deleteFile);

	const [selFileDetail, setSelFileDetail] = useState<{ name?: string | null; id?: string }>({
		name: undefined,
		id: undefined,
	});
	const updateFileDialog = useBoolean();
	const newFileDialog = useBoolean();

	const handleOpenExternalLink = async () => {
		const webview = new WebviewWindow("my-label", {
			title: "Buy Me A Coffee - Kenneth Ryan Dy",
			url: "https://www.buymeacoffee.com/dykennethrx",
			width: 600,
			height: 800,
		});
		webview.once("tauri://error", (e) => {
			console.error(e);
		});
	};

	return (
		<>
			<Sidebar>
				<div className="h-9" />
				<ContextMenu>
					<ContextMenuTrigger asChild>
						<SidebarContent>
							<SidebarMenu className="gap-0">
								<SidebarMenuItem className="p-2">
									<SidebarMenuButton
										className="text-center hover:bg-primary hover:text-primary-foreground"
										onClick={newFileDialog.onTrue}
									>
										<Plus />
										New File
									</SidebarMenuButton>
								</SidebarMenuItem>
								{files.map(f => (
									<ContextMenu key={f.id}>
										<ContextMenuTrigger>
											<SidebarMenuItem>
												<SidebarMenuButton
													isActive={f.id === activeTab?.id}
													onClick={() => {
														setTabById(f.id);
													}}
													className="rounded-none text-sm [&>svg]:size-3.5 hover:bg-primary hover:text-primary-foreground truncate"
												>
													<File />
													{f.fileName ?? "New Tab"}
												</SidebarMenuButton>
											</SidebarMenuItem>
										</ContextMenuTrigger>
										<ContextMenuContent className="w-40">
											<ContextMenuItem onClick={newFileDialog.onTrue}>
												New File
											</ContextMenuItem>
											<ContextMenuSeparator />
											<ContextMenuItem onClick={() => {
												setSelFileDetail({
													id: f.id,
													name: f.fileName,
												});
												updateFileDialog.onTrue();
											}}
											>
												Rename
											</ContextMenuItem>
											<ContextMenuItem onClick={() => {
												deleteFile(f.id);
											}}
											>
												Delete
											</ContextMenuItem>
										</ContextMenuContent>
									</ContextMenu>
								))}
							</SidebarMenu>
						</SidebarContent>
					</ContextMenuTrigger>
					<ContextMenuContent className="w-40">
						<ContextMenuItem onClick={newFileDialog.onTrue}>
							New File
						</ContextMenuItem>
					</ContextMenuContent>
				</ContextMenu>
				<SidebarFooter className="items-center">
					<button onClick={handleOpenExternalLink} className="w-36">
						<img src={BuyMeCoffeImage} width={200} height={200} />
					</button>
				</SidebarFooter>
			</Sidebar>
			<NewUpdateFile open={newFileDialog.value} onClose={newFileDialog.onFalse} />
			<NewUpdateFile open={updateFileDialog.value} onClose={updateFileDialog.onFalse} {...selFileDetail} />
		</>
	);
}
