import type { NodeViewProps } from "@tiptap/react";
import type { JSXElementConstructor, Key, ReactElement, ReactNode } from "react";

import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";

// ----------------------------------------------------------------------

export default function CodeBlockComponent({ node: { attrs: { language: defaultLanguage } }, updateAttributes, extension }: NodeViewProps) {
	return (
		<NodeViewWrapper className="code-block">
			<select contentEditable={false} defaultValue={defaultLanguage} onChange={event => updateAttributes({ language: event.target.value })}>
				<option value="null">
					auto
				</option>
				<option disabled>
					—
				</option>
				{extension.options.lowlight.listLanguages().map((lang: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined, index: Key | null | undefined) => (
					<option key={index} value={lang as string}>
						{lang}
					</option>
				))}
			</select>
			<pre>
				<NodeViewContent as="code" />
			</pre>
		</NodeViewWrapper>
	);
}
