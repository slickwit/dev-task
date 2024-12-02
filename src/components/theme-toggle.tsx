import { useTheme } from "next-themes";
import { MenubarContent, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarTrigger } from "@/components/ui/menubar";

// ----------------------------------------------------------------------

export default function ThemeToggle() {
	const { setTheme, theme } = useTheme();

	return (
		<MenubarMenu>
			<MenubarTrigger>Theme</MenubarTrigger>
			<MenubarContent forceMount>
				<MenubarRadioGroup value={theme}>
					<MenubarRadioItem value="light" onClick={() => setTheme("light")}>
						<span>Light</span>
					</MenubarRadioItem>
					<MenubarRadioItem value="dark" onClick={() => setTheme("dark")}>
						<span>Dark</span>
					</MenubarRadioItem>
					<MenubarRadioItem value="system" onClick={() => setTheme("system")}>
						<span>System</span>
					</MenubarRadioItem>
				</MenubarRadioGroup>
			</MenubarContent>
		</MenubarMenu>
	);
}
