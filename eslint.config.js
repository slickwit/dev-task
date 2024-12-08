import antfu from "@antfu/eslint-config";

export default antfu({
	type: "app",
	typescript: true,
	formatters: false,
	stylistic: {
		indent: "tab",
		semi: true,
		quotes: "double",
	},
	rules: {
		"no-console": ["warn"],
		"perfectionist/sort-imports": ["error", {
			internalPattern: ["@/.+"],
		}],
		"unicorn/filename-case": ["error", {
			case: "kebabCase",
			ignore: ["README.md", "src-tauri/.+"],
		}],
		"style/jsx-one-expression-per-line": ["off"],
		"jsonc/indent": ["error", 2],
	},
	ignores: ["src-tauri/**"],
});
