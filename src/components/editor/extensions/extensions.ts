import CharacterCount from '@tiptap/extension-character-count';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { ReactNodeViewRenderer } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import bash from 'highlight.js/lib/languages/bash';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import pgsql from 'highlight.js/lib/languages/pgsql';
import php from 'highlight.js/lib/languages/php';
import powershell from 'highlight.js/lib/languages/powershell';
import python from 'highlight.js/lib/languages/python';
import rs from 'highlight.js/lib/languages/rust';
import shell from 'highlight.js/lib/languages/shell';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import { createLowlight } from 'lowlight';
import { Markdown } from 'tiptap-markdown';

import CodeBlockComponent from './code-block-component';
import { TrailingNode } from './trailing-node';

// ----------------------------------------------------------------------

const lowlight = createLowlight();
lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('js', js);
lowlight.register('ts', ts);
lowlight.register('python', python);
lowlight.register('php', php);
lowlight.register('bash', bash);
lowlight.register('shell', shell);
lowlight.register('json', json);
lowlight.register('powershell', powershell);
lowlight.register('postgres', pgsql);
lowlight.register('rs', rs);
lowlight.register('shell', shell);

export const extensions = [
  CodeBlockLowlight.extend({
    addNodeView() {
      return ReactNodeViewRenderer(CodeBlockComponent);
    },
  }).configure({
    lowlight,
    defaultLanguage: 'ts',
  }),
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
      HTMLAttributes: {
        class: 'font-bold tracking-tight',
      },
    },
    paragraph: {
      HTMLAttributes: {
        class: 'leading-7',
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: 'my-6 pl-4 border-l-4 border-solid border-border',
      },
    },
    bulletList: {
      HTMLAttributes: {
        class: 'p-0.5 my-5 mx-4',
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: 'p-0.5 my-5 mx-4',
      },
    },
    codeBlock: false,
  }),
  TrailingNode,
  CharacterCount,
  Markdown.configure({
    transformPastedText: true,
  }),
];
