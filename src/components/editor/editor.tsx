import { EditorContent, useEditor } from '@tiptap/react';

import { ContextMenu, ContextMenuTrigger } from '@/components/ui/context-menu';

import EditorContextMenuContent from './editor-context-menu-content';
import './tiptap.css';
import { extensions } from './extensions/extensions';
import EditorMenuBar from './menu-bar';

// ----------------------------------------------------------------------

export default function Editor() {
  const editor = useEditor({
    autofocus: true,
    extensions,
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none h-full [&_h1]:text-3xl [&_h2]:text-xl [&_h3]:text-lg [&_pre]:bg-zinc-900 dark:[&_pre]:bg-zinc-800',
        spellcheck: 'false',
      },
    },
    content: `<pre>
    <code>
for (var i=1; i <= 20; i++)
{
  if (i % 15 == 0)
    console.log("FizzBuzz");
  else if (i % 3 == 0)
    console.log("Fizz");
  else if (i % 5 == 0)
    console.log("Buzz");
  else
    console.log(i);
}</code>
    </pre>
`,
  });

  if (!editor)
    return null;

  return (
    <div className="h-full relative">
      <div className="h-full flex flex-col">
        <EditorMenuBar editor={editor} />
        <ContextMenu>
          <ContextMenuTrigger className="h-full px-4">
            <EditorContent editor={editor} className="h-full px-4" autoFocus />
          </ContextMenuTrigger>
          <EditorContextMenuContent editor={editor} />
        </ContextMenu>
      </div>
      <div className="fixed bottom-0 left-0 text-right w-full bg-slate-900 space-x-2 mr-2 pb-0.5 text-xs text-muted-foreground tracking-wide">
        <span>
          Char:
          {editor.storage.characterCount.characters()}
        </span>
        <span>
          Words:
          {editor.storage.characterCount.words()}
        </span>
      </div>
    </div>
  );
}
