import { useCurrentEditor } from '@tiptap/react';

import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut } from '@/components/ui/context-menu';

// ----------------------------------------------------------------------

export default function EditorContextMenuContent() {
  const { editor } = useCurrentEditor();

  if (!editor)
    return null;

  return (
    <ContextMenuContent className="w-64">
      <ContextMenuItem
        inset
        onClick={() => {
          location?.reload();
        }}
      >
        Reload
        <ContextMenuShortcut>⌘R</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem inset onClick={() => editor.chain().focus().toggleOrderedList().run()}>
        Close
        <ContextMenuShortcut>⌘W</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem inset onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
        Code Block
        <ContextMenuShortcut>⌘ Alt C</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem
        inset
        disabled={
          !editor.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
        onClick={() => editor.chain().focus().undo().run()}
      >
        Undo
        <ContextMenuShortcut>⌘Z</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem
        inset
        disabled={
          !editor.can()
            .chain()
            .focus()
            .redo()
            .run()
        }
        onClick={() => editor.chain().focus().redo().run()}
      >
        Redo
        <ContextMenuShortcut>⌘Y</ContextMenuShortcut>
      </ContextMenuItem>
    </ContextMenuContent>
  );
}
