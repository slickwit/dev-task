import type { Editor } from '@tiptap/core';

import { ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuShortcut } from '@/components/ui/context-menu';

// ----------------------------------------------------------------------

export default function EditorContextMenuContent({ editor }: { editor: Editor }) {
  return (
    <ContextMenuContent className="w-64">
      <ContextMenuItem inset disabled>
        Reload
        <ContextMenuShortcut>⌘R</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem inset disabled>
        Close
        <ContextMenuShortcut>⌘W</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuItem inset disabled>
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