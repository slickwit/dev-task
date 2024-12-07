import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import { Bold, Code, CodeSquare, Italic, List, ListCheck, ListOrdered, Quote, Redo, SeparatorHorizontal, Strikethrough, Undo } from 'lucide-react';

import './tiptap.css';

import { Button } from '@/components/ui/button';
import { ContextMenu, ContextMenuTrigger } from '@/components/ui/context-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
} from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useFileStore } from '@/store/file.store';

import { useFileContext } from '../providers/file-provider';
import EditorContextMenuContent from './editor-context-menu-content';
import { extensions } from './extensions/extensions';
import EditorMenuBar from './menu-bar';

// ----------------------------------------------------------------------

export default function Editor() {
  const activeTab = useFileStore(state => state.activeTab);
  const setTabById = useFileStore(state => state.setTabById);

  return (
    <div className="h-full relative">
      <div className="h-full flex flex-col">
        <Tabs value={activeTab?.id ?? ''} className="h-full" onValueChange={setTabById}>
          <TabsList className="p-0 bg-transparent rounded-none w-full h-7">
            <EditorMenuBar />
          </TabsList>
          <EditorList />
        </Tabs>
      </div>
    </div>
  );
}

function EditorList() {
  const { editorDetailOpen } = useFileContext();
  const openedTab = useFileStore(state => state.openedTab);
  const editorUpdate = useFileStore(state => state.editorUpdate);

  return (
    openedTab.map(file => (
      <TabsContent key={file.id} value={file.id} className="h-[calc(100%_-_40px)] mt-0 focus-visible:!outline-0 focus-visible:ring-0">
        <ContextMenu>
          <ContextMenuTrigger className="relative flex h-full">
            <EditorProvider
              extensions={extensions}
              content={file.content}
              editorContainerProps={{ className: cn('absolute left-0 top-2 px-4 h-[90%] w-full transition-[top]', editorDetailOpen && 'top-8') }}
              editorProps={{ attributes: { class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none h-full [&_h1]:text-3xl [&_h2]:text-xl [&_h3]:text-lg [&_pre]:bg-zinc-900 dark:[&_pre]:bg-zinc-800' } }}
              shouldRerenderOnTransaction={false}
              slotBefore={<EditorHeader open={editorDetailOpen} />}
              slotAfter={<EditorFooter />}
              immediatelyRender
              enableContentCheck={false}
              autofocus="end"
              onCreate={({ editor }) => {
                editor.commands.focus();
              }}
              onUpdate={(props) => {
                editorUpdate(props, file.id);
              }}
              enablePasteRules
              enableInputRules
            >
              <EditorContextMenuContent />
            </EditorProvider>
          </ContextMenuTrigger>
        </ContextMenu>
      </TabsContent>
    ))
  );
}

function EditorHeader({ open }: { open: boolean }) {
  const { editor } = useCurrentEditor();
  if (!editor)
    return null;
  return (
    <div className={cn('flex items-center gap-x-2 flex-wrap transition-[height] h-0 w-full overflow-hidden', open && 'h-7 border-b')}>
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
          <SelectTrigger className="w-[180px] h-7 rounded-none">
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
          className={cn('size-7 flex-shrink-0 rounded-none', editor.isActive('bold') && 'bg-primary border-0 hover:bg-primary/90 text-primary-foreground hover:text-primary-foreground')}
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
          className={cn('size-7 flex-shrink-0 rounded-none', editor.isActive('italic') && 'bg-primary border-0 hover:bg-primary/90 text-primary-foreground hover:text-primary-foreground')}
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
          className={cn('size-7 flex-shrink-0 rounded-none', editor.isActive('strike') && 'bg-primary border-0 hover:bg-primary/90 text-primary-foreground hover:text-primary-foreground')}
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
          className={cn('size-7 flex-shrink-0 rounded-none', editor.isActive('bulletList') && 'bg-primary border-0 hover:bg-primary/90 text-primary-foreground hover:text-primary-foreground')}
          variant="ghost"
          size="icon"
          title="Unordered List"
        >
          <List />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn('size-7 flex-shrink-0 rounded-none', editor.isActive('orderedList') && 'bg-primary border-0 hover:bg-primary/90 text-primary-foreground hover:text-primary-foreground')}
          variant="ghost"
          size="icon"
          title="Ordered List"
        >
          <ListOrdered />
        </Button>
        <Button
          onClick={() => editor.chain().focus().insertContent(`<ul data-type="taskList"><li data-type="taskItem" data-checked="true"></li></ul>`).run()}
          className={cn('size-7 flex-shrink-0 rounded-none')}
          variant="ghost"
          size="icon"
          title="Todo List"
        >
          <ListCheck />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={cn('size-7 flex-shrink-0 rounded-none', editor.isActive('blockquote') && 'bg-primary border-0 hover:bg-primary/90 text-primary-foreground hover:text-primary-foreground')}
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
        className={cn('size-7 flex-shrink-0 rounded-none', editor.isActive('code') && 'bg-primary border-0 hover:bg-primary/90 text-primary-foreground hover:text-primary-foreground')}
        variant="ghost"
        size="icon"
        title="Code"
      >
        <Code />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={cn('size-7 flex-shrink-0 rounded-none', editor.isActive('codeBlock') && 'bg-primary border-0 hover:bg-primary/90 text-primary-foreground hover:text-primary-foreground')}
        variant="ghost"
        size="icon"
        title="Code Block"
      >
        <CodeSquare />
      </Button>
      <div className="flex items-center border-l gap-x-2 pr-2">
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
  );
}

function EditorFooter() {
  const { editor } = useCurrentEditor();
  if (!editor)
    return null;

  return (
    <div className="fixed bottom-0 left-0 text-right bg-slate-900 space-x-2 mr-2 pb-0.5 text-xs text-muted-foreground tracking-wide w-svw pr-2">
      <span>
        Char:
        {editor.storage.characterCount.characters()}
      </span>
      <span>
        Words:
        {editor.storage.characterCount.words()}
      </span>
    </div>
  );
}
