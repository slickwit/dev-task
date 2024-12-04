import type { Editor } from '@tiptap/react';

import { Bold, ChevronDown, ChevronUp, Code, CodeSquare, Italic, List, ListOrdered, Quote, Redo, SeparatorHorizontal, Strikethrough, Undo } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useBoolean } from '@/hooks/use-boolean';
import { cn } from '@/lib/utils';

// ----------------------------------------------------------------------

export default function EditorMenuBar({ editor }: { editor: Editor }) {
  const showMenu = useBoolean(true);

  return (
    <div className="flex flex-col border-b mb-1.5 shadow-sm">
      <div className="flex items-center justify-between gap-x-2 relative">
        <SidebarTrigger className="rounded-none flex-shrink-0" />
        <div className="flex items-center gap-x-2 pr-2">
          <Button
            className="size-5 rounded-full flex-shrink-0 absolute top-4 text-border bg-background left-1/2 transform -translate-x-1/2"
            variant="ghost"
            size="icon"
            onClick={() => {
              showMenu.onToggle();
            }}
            title="Editor Options"
          >
            {showMenu.value
              ? (
                  <ChevronUp />
                )
              : (
                  <ChevronDown />
                )}
          </Button>
          <Button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .undo()
                .run()
            }
            className="size-7 rounded-none flex-shrink-0"
            title="Undo"
            size="icon"
            variant="ghost"
          >
            <Undo />
          </Button>
          <Button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .redo()
                .run()
            }
            className="size-7 rounded-none flex-shrink-0"
            title="Redo"
            size="icon"
            variant="ghost"
          >
            <Redo />
          </Button>
        </div>
      </div>
      <div className={cn('flex items-center gap-x-2 px-2 flex-wrap transition-[height] h-0 w-full overflow-hidden', showMenu.value && 'h-10 border-t')}>
        <div className="flex items-center gap-x-2 border-r pr-2">
          <Select
            defaultValue="paragraph"
            onValueChange={(value) => {
              if (value === 'paragraph') {
                editor.chain().focus().setParagraph().run();
              }
              else {
                editor.chain().focus().toggleHeading({ level: Number(value) as 1 | 2 | 3 }).run();
              }
            }}
          >
            <SelectTrigger className="w-[180px] h-7">
              <SelectValue placeholder="Select a fruit" className="text-xs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="text-xs" value="paragraph">Paragraph</SelectItem>
              <SelectItem className="text-xs" value="1">Heading 1</SelectItem>
              <SelectItem className="text-xs" value="2">Heading 2</SelectItem>
              <SelectItem className="text-xs" value="3">Heading 3</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            className={cn('size-7 flex-shrink-0 transition-colors', editor.isActive('bold') && 'bg-primary border-0 hover:bg-primary/90 text-primary-foreground hover:text-primary-foreground')}
            variant="ghost"
            size="icon"
            title="Bold"
          >
            <Bold />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
            className={cn('size-7 flex-shrink-0', editor.isActive('italic') && 'bg-primary border-0 hover:bg-primary/90 text-primary-foreground hover:text-primary-foreground')}
            variant="ghost"
            size="icon"
            title="Italic"
          >
            <Italic />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleStrike()
                .run()
            }
            className={cn('size-7 flex-shrink-0', editor.isActive('strike') && 'bg-primary border-0 hover:bg-primary/90 text-primary-foreground hover:text-primary-foreground')}
            variant="ghost"
            size="icon"
            title="Strike Through"
          >
            <Strikethrough />
          </Button>
        </div>
        <div className="flex items-center gap-x-2 border-r pr-2">
          <Button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn('size-7 flex-shrink-0', editor.isActive('bulletList') && 'bg-primary border-0 hover:bg-primary/90 text-primary-foreground hover:text-primary-foreground')}
            variant="ghost"
            size="icon"
            title="Unordered List"
          >
            <List />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={cn('size-7 flex-shrink-0', editor.isActive('orderedList') && 'bg-primary border-0 hover:bg-primary/90 text-primary-foreground hover:text-primary-foreground')}
            variant="ghost"
            size="icon"
            title="Ordered List"
          >
            <ListOrdered />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={cn('size-7 flex-shrink-0', editor.isActive('blockquote') && 'bg-primary border-0 hover:bg-primary/90 text-primary-foreground hover:text-primary-foreground')}
            variant="ghost"
            size="icon"
            title="Blockquote"
          >
            <Quote />
          </Button>
          <Button
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            title="Horizontal Rule"
            className="size-7 rounded-none flex-shrink-0"
            variant="ghost"
            size="icon"
          >
            <SeparatorHorizontal />
          </Button>
        </div>
        <Button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
          className={cn('size-7 flex-shrink-0', editor.isActive('code') && 'bg-primary border-0 hover:bg-primary/90 text-primary-foreground hover:text-primary-foreground')}
          variant="ghost"
          size="icon"
          title="Code"
        >
          <Code />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={cn('size-7 flex-shrink-0', editor.isActive('codeBlock') && 'bg-primary border-0 hover:bg-primary/90 text-primary-foreground hover:text-primary-foreground')}
          variant="ghost"
          size="icon"
          title="Code Block"
        >
          <CodeSquare />
        </Button>
      </div>
    </div>
  );
}
