import { Check } from "lucide-react";
import { useTheme } from "next-themes";

import { MenubarContent, MenubarItem, MenubarLabel, MenubarMenu, MenubarRadioGroup, MenubarRadioItem, MenubarSeparator, MenubarTrigger } from "@/components/ui/menubar";
import { cn } from "@/lib/utils";
import { PRESET_OPTIONS, useSettingStore } from "@/store/setting.store";

// ----------------------------------------------------------------------

export default function ThemeToggle() {
	const { setTheme, theme } = useTheme();

	return (
		<MenubarMenu>
			<MenubarTrigger className="rounded-none">Theme</MenubarTrigger>
			<MenubarContent forceMount sideOffset={0} className="rounded-sm">
				<MenubarLabel className="text-xs">
					Mode
				</MenubarLabel>
				<MenubarRadioGroup value={theme}>
					<MenubarRadioItem className="text-xs rounded-sm" value="light" onClick={() => setTheme("light")}>
						<span>Light</span>
					</MenubarRadioItem>
					<MenubarRadioItem className="text-xs rounded-sm" value="dark" onClick={() => setTheme("dark")}>
						<span>Dark</span>
					</MenubarRadioItem>
					<MenubarRadioItem className="text-xs rounded-sm" value="system" onClick={() => setTheme("system")}>
						<span>System</span>
					</MenubarRadioItem>
				</MenubarRadioGroup>
				<MenubarSeparator />
				<ThemeColorPreset />
			</MenubarContent>
		</MenubarMenu>
	);
}

function ThemeColorPreset() {
	const colorPreset = useSettingStore(state => state.themeColorPreset);
	const updateColorPreset = useSettingStore(state => state.updateColorPreset);

	return (
		<>
			<MenubarLabel className="text-xs">
				Color Preset
			</MenubarLabel>
			<MenubarRadioGroup value={colorPreset}>
				{PRESET_OPTIONS.map(([key, value]) => (
					<MenubarItem key={key} className="text-xs rounded-sm flex items-center gap-x-2" onClick={() => updateColorPreset(key)}>
						<span style={{ backgroundColor: value }} className={cn("size-2.5 rounded-full")} />
						<span className="capitalize">{key}</span>
						{key === colorPreset && (
							<div className="flex-1 flex justify-end">
								<Check className="size-3.5" />
							</div>
						)}
					</MenubarItem>
				))}
			</MenubarRadioGroup>
		</>
	);
}
