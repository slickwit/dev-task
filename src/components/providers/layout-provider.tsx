import { useSettingStore } from "@/store/setting.store";

// ----------------------------------------------------------------------

interface LayoutProviderProps {
	children?: React.ReactNode;
}

export default function LayoutProvider({ children }: LayoutProviderProps) {
	const hasHydrated = useSettingStore(state => state._hasHydrated);

	if (!hasHydrated)
		return null;

	return (
		<>
			{children}
		</>
	);
}
