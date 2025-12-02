'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { Icon } from '@iconify/react';
import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';

const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

type RichTextEditorProps = {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
};

export default function RichTextEditor({
  content,
  onChange,
  placeholder = 'Start writing...',
}: RichTextEditorProps) {
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState({ top: 0, left: 0 });
  const [slashMenuSearch, setSlashMenuSearch] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [iconSearch, setIconSearch] = useState('');
  const editorRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-[#037280] underline hover:text-[#025b66]',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content,
    editorProps: {
      attributes: {
        class:
          'prose prose-lg max-w-none focus:outline-none min-h-[500px] px-6 py-4',
      },
      handleKeyDown: (view, event) => {
        if (event.key === '/' && view.state.selection.empty) {
          const { from } = view.state.selection;
          const coords = view.coordsAtPos(from);
          setSlashMenuPosition({
            top: coords.top + 24,
            left: coords.left,
          });
          setShowSlashMenu(true);
          setSlashMenuSearch('');
          return false;
        }
        if (showSlashMenu && event.key === 'Escape') {
          setShowSlashMenu(false);
          return true;
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => {
      // Store as HTML for now (TipTap getHTML is reliable)
      onChange(editor.getHTML());
      // Check for slash command
      const { from, to } = editor.state.selection;
      if (from === to) {
        const textBefore = editor.state.doc.textBetween(Math.max(0, from - 20), from, '\n');
        const match = textBefore.match(/\/(\w*)$/);
        if (match) {
          setSlashMenuSearch(match[1]);
          setShowSlashMenu(true);
        } else if (showSlashMenu) {
          setShowSlashMenu(false);
        }
      }
    },
    onSelectionUpdate: ({ editor }) => {
      const { from, to } = editor.state.selection;
      if (from !== to) {
        setShowFloatingMenu(true);
        setShowSlashMenu(false);
        // Position menu near selection
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          setMenuPosition({
            top: rect.top - 50,
            left: rect.left + rect.width / 2,
          });
        }
      } else {
        setShowFloatingMenu(false);
      }
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleStrike = () => editor.chain().focus().toggleStrike().run();
  const toggleCode = () => editor.chain().focus().toggleCode().run();
  const toggleHeading = (level: 1 | 2 | 3) =>
    editor.chain().focus().toggleHeading({ level }).run();
  const toggleBulletList = () => editor.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () => editor.chain().focus().toggleOrderedList().run();
  const toggleBlockquote = () => editor.chain().focus().toggleBlockquote().run();
  const toggleCodeBlock = () => editor.chain().focus().toggleCodeBlock().run();
  const setHorizontalRule = () => editor.chain().focus().setHorizontalRule().run();

  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const addImage = () => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const onEmojiClick = (emojiData: any) => {
    if (editor) {
      editor.chain().focus().insertContent(emojiData.emoji).run();
      setShowEmojiPicker(false);
    }
  };

  const lucideIcons = [
    'lucide:home', 'lucide:user', 'lucide:heart', 'lucide:star', 'lucide:check', 
    'lucide:x', 'lucide:mail', 'lucide:phone', 'lucide:calendar', 'lucide:clock',
    'lucide:map-pin', 'lucide:globe', 'lucide:camera', 'lucide:image', 'lucide:video',
    'lucide:music', 'lucide:file', 'lucide:folder', 'lucide:download', 'lucide:upload',
    'lucide:search', 'lucide:settings', 'lucide:menu', 'lucide:more-vertical', 'lucide:edit',
    'lucide:trash', 'lucide:plus', 'lucide:minus', 'lucide:arrow-right', 'lucide:arrow-left',
    'lucide:arrow-up', 'lucide:arrow-down', 'lucide:chevron-right', 'lucide:chevron-left', 'lucide:chevron-up',
    'lucide:chevron-down', 'lucide:thumbs-up', 'lucide:thumbs-down', 'lucide:message-circle', 'lucide:share',
    'lucide:bookmark', 'lucide:tag', 'lucide:shopping-cart', 'lucide:shopping-bag', 'lucide:credit-card',
    'lucide:gift', 'lucide:trophy', 'lucide:award', 'lucide:target', 'lucide:flag',
    'lucide:sun', 'lucide:moon', 'lucide:cloud', 'lucide:zap', 'lucide:droplet',
    'lucide:flame', 'lucide:leaf', 'lucide:tree', 'lucide:flower', 'lucide:wind',
    'lucide:smile', 'lucide:frown', 'lucide:meh', 'lucide:laugh', 'lucide:angry',
    'lucide:alert-circle', 'lucide:alert-triangle', 'lucide:info', 'lucide:help-circle', 'lucide:check-circle',
    'lucide:x-circle', 'lucide:shield', 'lucide:lock', 'lucide:unlock', 'lucide:key',
    'lucide:eye', 'lucide:eye-off', 'lucide:bell', 'lucide:bell-off', 'lucide:volume',
    'lucide:volume-x', 'lucide:play', 'lucide:pause', 'lucide:stop', 'lucide:skip-forward',
    'lucide:skip-back', 'lucide:repeat', 'lucide:shuffle', 'lucide:maximize', 'lucide:minimize',
  ];

  const filteredIcons = lucideIcons.filter(icon => 
    icon.toLowerCase().includes(iconSearch.toLowerCase())
  );

  const insertIcon = (iconName: string) => {
    if (editor) {
      // Insert icon as a simple span with data attribute
      const iconLabel = iconName.replace('lucide:', '');
      const iconHtml = `<span class="editor-icon" data-icon="${iconName}" contenteditable="false">:${iconLabel}:</span> `;
      editor.chain().focus().insertContent(iconHtml).run();
      setShowIconPicker(false);
      setIconSearch('');
    }
  };

  const ToolbarButton = ({
    onClick,
    isActive = false,
    icon,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    icon: string;
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded hover:bg-gray-100 transition-colors ${
        isActive ? 'bg-gray-200 text-[#037280]' : 'text-gray-700'
      }`}
    >
      <Icon icon={icon} className="w-5 h-5" />
    </button>
  );

  const ToolbarDivider = () => <div className="w-px h-6 bg-gray-300" />;

  const slashCommands = [
    { label: 'Heading 1', icon: 'mdi:format-header-1', command: () => editor?.chain().focus().toggleHeading({ level: 1 }).run() },
    { label: 'Heading 2', icon: 'mdi:format-header-2', command: () => editor?.chain().focus().toggleHeading({ level: 2 }).run() },
    { label: 'Heading 3', icon: 'mdi:format-header-3', command: () => editor?.chain().focus().toggleHeading({ level: 3 }).run() },
    { label: 'Bullet List', icon: 'mdi:format-list-bulleted', command: () => editor?.chain().focus().toggleBulletList().run() },
    { label: 'Numbered List', icon: 'mdi:format-list-numbered', command: () => editor?.chain().focus().toggleOrderedList().run() },
    { label: 'Quote', icon: 'mdi:format-quote-close', command: () => editor?.chain().focus().toggleBlockquote().run() },
    { label: 'Code Block', icon: 'mdi:code-braces', command: () => editor?.chain().focus().toggleCodeBlock().run() },
    { label: 'Divider', icon: 'mdi:minus', command: () => editor?.chain().focus().setHorizontalRule().run() },
    { label: 'Emoji', icon: 'mdi:emoticon-happy', command: () => { setShowSlashMenu(false); setShowEmojiPicker(true); } },
    { label: 'Icon', icon: 'lucide:smile', command: () => { setShowSlashMenu(false); setShowIconPicker(true); } },
  ];

  const filteredCommands = slashCommands.filter(cmd => 
    cmd.label.toLowerCase().includes(slashMenuSearch.toLowerCase())
  );

  const executeSlashCommand = (command: () => void) => {
    if (!editor) return;
    // Remove the slash and search text
    const { from } = editor.state.selection;
    const textBefore = editor.state.doc.textBetween(Math.max(0, from - 20), from, '\n');
    const match = textBefore.match(/\/(\w*)$/);
    if (match) {
      const deleteFrom = from - match[0].length;
      editor.chain().focus().deleteRange({ from: deleteFrom, to: from }).run();
    }
    command();
    setShowSlashMenu(false);
  };

  const BubbleToolbarButton = ({
    onClick,
    isActive = false,
    icon,
    title,
  }: {
    onClick: () => void;
    isActive?: boolean;
    icon: string;
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded hover:bg-gray-700 transition-colors ${
        isActive ? 'bg-gray-700 text-white' : 'text-gray-200'
      }`}
    >
      <Icon icon={icon} className="w-4 h-4" />
    </button>
  );

  return (
    <div ref={editorRef} className="border border-gray-300 rounded-lg overflow-hidden bg-white relative">
      {/* Main Toolbar - Sticky */}
      <div className="border-b border-gray-300 bg-gray-50 p-2 flex items-center gap-1 flex-wrap sticky top-0 z-10">
        <ToolbarButton
          onClick={() => toggleHeading(1)}
          isActive={editor.isActive('heading', { level: 1 })}
          icon="mdi:format-header-1"
          title="Heading 1"
        />
        <ToolbarButton
          onClick={() => toggleHeading(2)}
          isActive={editor.isActive('heading', { level: 2 })}
          icon="mdi:format-header-2"
          title="Heading 2"
        />
        <ToolbarButton
          onClick={() => toggleHeading(3)}
          isActive={editor.isActive('heading', { level: 3 })}
          icon="mdi:format-header-3"
          title="Heading 3"
        />

        <ToolbarDivider />

        <ToolbarButton
          onClick={toggleBulletList}
          isActive={editor.isActive('bulletList')}
          icon="mdi:format-list-bulleted"
          title="Bullet List"
        />
        <ToolbarButton
          onClick={toggleOrderedList}
          isActive={editor.isActive('orderedList')}
          icon="mdi:format-list-numbered"
          title="Numbered List"
        />

        <ToolbarDivider />

        <ToolbarButton
          onClick={toggleBlockquote}
          isActive={editor.isActive('blockquote')}
          icon="mdi:format-quote-close"
          title="Quote"
        />
        <ToolbarButton
          onClick={toggleCodeBlock}
          isActive={editor.isActive('codeBlock')}
          icon="mdi:code-braces"
          title="Code Block"
        />

        <ToolbarDivider />

        <ToolbarButton
          onClick={addLink}
          isActive={editor.isActive('link')}
          icon="mdi:link-variant"
          title="Add Link"
        />
        <ToolbarButton onClick={addImage} icon="mdi:image" title="Add Image" />
        
        <ToolbarDivider />
        
        <ToolbarButton 
          onClick={() => setShowEmojiPicker(!showEmojiPicker)} 
          icon="mdi:emoticon-happy" 
          title="Emoji" 
        />
        <ToolbarButton 
          onClick={() => setShowIconPicker(!showIconPicker)} 
          icon="lucide:smile" 
          title="Icon" 
        />
      </div>

      {/* Floating Menu - Appears on text selection */}
      {editor && showFloatingMenu && (
        <div 
          className="fixed z-50 bg-gray-800 shadow-2xl rounded-lg p-2 flex items-center gap-1 border border-gray-700"
          style={{
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
            transform: 'translateX(-50%)',
          }}
        >
          <BubbleToolbarButton
            onClick={toggleBold}
            isActive={editor.isActive('bold')}
            icon="mdi:format-bold"
            title="Bold (Ctrl+B)"
          />
          <BubbleToolbarButton
            onClick={toggleItalic}
            isActive={editor.isActive('italic')}
            icon="mdi:format-italic"
            title="Italic (Ctrl+I)"
          />
          <BubbleToolbarButton
            onClick={toggleStrike}
            isActive={editor.isActive('strike')}
            icon="mdi:format-strikethrough"
            title="Strikethrough"
          />
          
          <div className="w-px h-6 bg-gray-600 mx-1" />
          
          <BubbleToolbarButton
            onClick={() => toggleHeading(1)}
            isActive={editor.isActive('heading', { level: 1 })}
            icon="mdi:format-header-1"
            title="Heading 1"
          />
          <BubbleToolbarButton
            onClick={() => toggleHeading(2)}
            isActive={editor.isActive('heading', { level: 2 })}
            icon="mdi:format-header-2"
            title="Heading 2"
          />
          <BubbleToolbarButton
            onClick={() => toggleHeading(3)}
            isActive={editor.isActive('heading', { level: 3 })}
            icon="mdi:format-header-3"
            title="Heading 3"
          />
          
          <div className="w-px h-6 bg-gray-600 mx-1" />
          
          <BubbleToolbarButton
            onClick={toggleBulletList}
            isActive={editor.isActive('bulletList')}
            icon="mdi:format-list-bulleted"
            title="Bullet List"
          />
          <BubbleToolbarButton
            onClick={toggleOrderedList}
            isActive={editor.isActive('orderedList')}
            icon="mdi:format-list-numbered"
            title="Numbered List"
          />
          
          <div className="w-px h-6 bg-gray-600 mx-1" />
          
          <BubbleToolbarButton
            onClick={toggleCode}
            isActive={editor.isActive('code')}
            icon="mdi:code-tags"
            title="Code"
          />
          <BubbleToolbarButton
            onClick={toggleBlockquote}
            isActive={editor.isActive('blockquote')}
            icon="mdi:format-quote-close"
            title="Quote"
          />
          <BubbleToolbarButton
            onClick={addLink}
            isActive={editor.isActive('link')}
            icon="mdi:link-variant"
            title="Link"
          />
          <BubbleToolbarButton
            onClick={addImage}
            icon="mdi:image"
            title="Image"
          />
        </div>
      )}

      {/* Slash Command Menu */}
      {editor && showSlashMenu && (
        <div
          className="fixed z-50 bg-white shadow-2xl rounded-lg border border-gray-300 py-2 w-64"
          style={{
            top: `${slashMenuPosition.top}px`,
            left: `${slashMenuPosition.left}px`,
          }}
        >
          <div className="px-3 py-2 text-xs text-gray-500 font-semibold uppercase">
            Block Types
          </div>
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, index) => (
              <button
                key={index}
                type="button"
                onClick={() => executeSlashCommand(cmd.command)}
                className="w-full px-3 py-2 flex items-center gap-3 hover:bg-gray-100 transition-colors text-left"
              >
                <Icon icon={cmd.icon} className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-900">{cmd.label}</span>
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-sm text-gray-500">No results</div>
          )}
        </div>
      )}

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="fixed z-50" style={{ top: '100px', right: '24px' }}>
          <div className="relative">
            <button
              onClick={() => setShowEmojiPicker(false)}
              className="absolute -top-2 -right-2 z-10 w-8 h-8 bg-gray-800 text-white rounded-full hover:bg-gray-700 flex items-center justify-center"
            >
              <Icon icon="mdi:close" className="w-5 h-5" />
            </button>
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        </div>
      )}

      {/* Icon Picker */}
      {showIconPicker && (
        <div className="fixed z-50 bg-white shadow-2xl rounded-lg border border-gray-300 w-96" style={{ top: '100px', right: '24px' }}>
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Choose an Icon</h3>
            <button
              onClick={() => setShowIconPicker(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <Icon icon="mdi:close" className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          <div className="p-4 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search icons..."
              value={iconSearch}
              onChange={(e) => setIconSearch(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#037280]"
            />
          </div>

          <div className="p-4 grid grid-cols-8 gap-2 max-h-96 overflow-y-auto">
            {filteredIcons.map((iconName) => (
              <button
                key={iconName}
                type="button"
                onClick={() => insertIcon(iconName)}
                className="p-3 hover:bg-gray-100 rounded-lg transition-colors flex items-center justify-center"
                title={iconName.replace('lucide:', '')}
              >
                <Icon icon={iconName} className="w-6 h-6 text-gray-700" />
              </button>
            ))}
          </div>
          
          {filteredIcons.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No icons found
            </div>
          )}
        </div>
      )}

      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
}
