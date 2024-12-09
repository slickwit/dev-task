import { LazyStore } from "@tauri-apps/plugin-store";
import { z } from "zod";
import { create } from "zustand";

// ----------------------------------------------------------------------

export const PRESET_OPTIONS = [
	["default", "#88a3f1"],
	["orange", "#F97316"],
	["coffee", "#bb8658"],
	["rose", "#E11D48"],
	["zinc", "#18181B"],
	["midnight", "#d3d3d3"],
	["purple", "#7738DC"],
] as const;

const tauriSettingStore = new LazyStore(".settings.dat", { autoSave: 600 });

const settingSchema = z.object({
	themeColorPreset: z.enum(["default", "orange", "coffee", "rose", "zinc", "midnight", "purple"]),
});

interface ISettingState extends z.infer<typeof settingSchema> {
	_hasHydrated: boolean;
}

const defaultState: ISettingState = {
	themeColorPreset: "default",
	_hasHydrated: false,
};

interface ISettingAction {
	update: <T extends ISettingState, K extends keyof T>(name: K, newValue: T[K]) => void;
	updateColorPreset: (theme: ISettingState["themeColorPreset"]) => void;
}

export const useSettingStore = create<ISettingState & ISettingAction>()(set => ({
	...defaultState,
	update: async (name, newValue) => {
		set({ [name]: newValue });
		await tauriSettingStore.set(name as string, newValue);
	},
	updateColorPreset: async (name) => {
		set({ themeColorPreset: name });
		document.documentElement?.setAttribute?.("data-theme", name);
		await tauriSettingStore.set("themeColorPreset", name);
	},
}));

(async function () {
	const unparsedColorPreset = await tauriSettingStore.get("themeColorPreset");
	if (unparsedColorPreset) {
		const parsedSetting = settingSchema.safeParse({ themeColorPreset: unparsedColorPreset });
		if (parsedSetting.data) {
			document.documentElement?.setAttribute?.("data-theme", parsedSetting.data.themeColorPreset);
			useSettingStore.setState(parsedSetting.data);
		}
	}
	useSettingStore.setState({ _hasHydrated: true });
})();
