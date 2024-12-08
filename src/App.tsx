import Editor from "@/components/editor/editor";
import { FileProvider } from "@/components/providers/file-provider";

import { useFileStore } from "./store/file.store";

function App() {
	const hydrated = useFileStore(state => state._hasHydrated);

	if (!hydrated)
		return null;

	return (
		<FileProvider>
			<Editor />
		</FileProvider>
	);
}

export default App;
