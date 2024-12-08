import { ChevronDown, ChevronUp, X } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { TabsTrigger } from "@/components/ui/tabs";
import { useFileStore } from "@/store/file.store";

import { useFileContext } from "../providers/file-provider";

// ----------------------------------------------------------------------

export default function EditorMenuBar() {
	const { editorDetailOpen, editorDetailToggle } = useFileContext();
	const openedTab = useFileStore(state => state.openedTab);
	const closeTab = useFileStore(state => state.closeTab);

	return (
		<div className="w-full flex flex-col border-b">
			<div className="flex items-center justify-between relative">
				<SidebarTrigger className="rounded-none flex-shrink-0 border-r" />
				<div className="flex items-center w-full border-r overflow-x-auto">
					{openedTab.map((file) => {
						return (
							<div key={file.id} className="relative flex items-center">
								<TabsTrigger value={file.id} className="border-r rounded-none font-normal justify-between hover:bg-foreground/5 relative before:content-[''] before:w-full before:h-[1.5px] before:absolute before:inset-0 before:bg-slate-400 before:hidden data-[state=active]:before:block pl-1.5 h-7 min-w-28">
									<span className="truncate text-left min-w-full pr-3.5">{file.fileName ?? "New Tab"}</span>
								</TabsTrigger>
								<div className="size-5 absolute right-1 flex-shrink-0 flex items-center justify-center justify-self-end group/indicators">
									{!file.saved && (
										<span className="flex items-center justify-center group-hover/indicators:hidden">
											<span className="size-2 dark:bg-white/85 bg-slate-700/80 rounded-full"></span>
										</span>
									)}
									<span
										className={buttonVariants({ size: "icon", variant: "ghost", className: "!size-5 hidden cursor-pointer group-hover/indicators:flex" })}
										onClick={() => {
											closeTab(file.id);
										}}
									>
										<X width={8} height={8} />
									</span>
								</div>
							</div>
						);
					})}
				</div>
				<Button
					className="size-7 flex-shrink-0 hover:bg-transparent"
					variant="ghost"
					size="icon"
					onClick={editorDetailToggle}
					title="Editor Options"
				>
					{editorDetailOpen
						? (
								<ChevronUp />
							)
						: (
								<ChevronDown />
							)}
				</Button>
			</div>
		</div>
	);
}
