import React, {useEffect, useState} from 'react';
import '@mdxeditor/editor/style.css';
import './editorStyles.css';
import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  headingsPlugin,
  quotePlugin,
  listsPlugin,
  thematicBreakPlugin,
  linkDialogPlugin,
  imagePlugin,
  BlockTypeSelect,
  CodeToggle,
  CreateLink,
  InsertImage,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  linkPlugin,
  tablePlugin,
  InsertTable,
  codeMirrorPlugin,
  sandpackPlugin,
  ChangeCodeMirrorLanguage,
  InsertAdmonition,
  InsertCodeBlock,
  InsertFrontmatter,
  InsertSandpack,
  ShowSandpackInfo,
  codeBlockPlugin,
  ConditionalContents,
  useCodeBlockEditorContext,
  markdownShortcutPlugin,
  NestedLexicalEditor,
  directivesPlugin,
  AdmonitionDirectiveDescriptor,
  frontmatterPlugin
} from '@mdxeditor/editor';
import axios from "axios";

// If you need something more flexible, implement a custom directive editor.
const CalloutCustomDirectiveDescriptor = {
  name: 'c',
  testNode(node) {
    return node.name === 'c';
  },
  attributes: [],
  hasChildren: true,
  Editor: (props) => {
    return (
      <div style={{ border: '2px solid red', padding: 8, margin: 8 }}>
        <NestedLexicalEditor
          block
          getContent={(node) => node.children}
          getUpdatedMdastNode={(mdastNode, children) => {
            return { ...mdastNode, children };
          }}
        />
      </div>
    );
  }
};


async function imageUploadHandler(image) {
  const formData = new FormData()
  formData.append('image', image)
  // send the file to your server and return
  // the URL of the uploaded image in the response
  const response = await fetch('/uploads/new', {
    method: 'POST',
    body: formData
  })
  if (!response.ok) {
    throw new Error('Failed to upload image');
  }
  const json = (await response.json())
  return json.url
}

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim()

const simpleSandpackConfig = {
  defaultPreset: 'react',
  presets: [
    {
      label: 'React',
      name: 'react',
      meta: 'live react',
      sandpackTemplate: 'react',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
      initialSnippetContent: defaultSnippetContent
    },
  ]
}

const PlainTextCodeEditorDescriptor = {
  // always use the editor, no matter the language or the meta of the code block
  match: (language, meta) => true,
  // You can have multiple editors with different priorities, so that there's a "catch-all" editor (with the lowest priority)
  priority: 0,
  // The Editor is a React component
  Editor: (props) => {
    const cb = useCodeBlockEditorContext()
    // stops the proppagation so that the parent lexical editor does not handle certain events.
    return (
      <div onKeyDown={(e) => e.nativeEvent.stopImmediatePropagation()}>
        <textarea rows={3} cols={20} defaultValue={props.code} onChange={(e) => cb.setCode(e.target.value)} />
      </div>
    )
  }
}

/** use markdown with some code blocks */
const codeBlocksMarkdown = ""

function CreateNote() {
  const editorRef = React.useRef(null);
  const [editorContent, setEditorContent] = useState("Hello world");

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get("http://localhost:5000/Note");
    //             setEditorContent(response.data);
    //         } catch (error) {
    //             console.error('Error fetching notes:', error);
    //         }
    //     };
    //
    //     fetchData();
    // }, []); // Empty dependency array means this runs once when the component mounts
    //
    // useEffect(() => {
    //     const updateNotes = async () => {
    //         try {
    //             const response = await axios.post("http://localhost:5000/Note", { editorContent });
    //             console.log('Notes updated successfully');
    //         } catch (error) {
    //             console.error('Error updating notes:', error);
    //         }
    //     };
    //
    //     if (editorContent) { // Only update if there is content
    //         updateNotes();
    //     }
    // }, [editorContent]); // This runs whenever `editorContent` changes

  return (
      <div id={"operation"}>
    <div className="App">
      <header className="App-header">
        <MDXEditor
          // className="dark-theme dark-editor"
          // you may use the upper 

          contentEditableClassName="prose"

          
          markdown={editorContent}
          onChange={setEditorContent}


          plugins={[
            codeBlockPlugin({ defaultCodeBlockLanguage: 'js', codeBlockEditorDescriptors: [PlainTextCodeEditorDescriptor] }),
            sandpackPlugin({ sandpackConfig: simpleSandpackConfig }),
            codeMirrorPlugin({
              codeBlockLanguages: {
                js: 'JavaScript',
                css: 'CSS',
                C: 'C',
                Python: 'Python',
                Java: 'Java',
                Rust: 'Rust',
                R: 'R',
                bash: 'bash',
                text: 'text',
              }
            }),

            diffSourcePlugin({ diffMarkdown: 'An older version', viewMode: 'rich-text' }),

            toolbarPlugin({
              toolbarContents: () => (
                <DiffSourceToggleWrapper>
                  <UndoRedo />
                  <BlockTypeSelect />
                  <BoldItalicUnderlineToggles />
                  <CodeToggle />
                  <CreateLink />
                  <InsertImage />
                  <InsertTable />
                  <InsertAdmonition />
                  <InsertFrontmatter />
                  <ConditionalContents
                    options={[
                      { when: (editor) => editor?.editorType === 'codeblock', contents: () => <ChangeCodeMirrorLanguage /> },
                      { when: (editor) => editor?.editorType === 'sandpack', contents: () => <ShowSandpackInfo /> },
                      {
                        fallback: () => (<>
                          <InsertCodeBlock />
                          <InsertSandpack />
                        </>)
                      }
                    ]}
                  />
                  {/* <YouTubeButton /> */}
                </DiffSourceToggleWrapper>
              )
            }),
            headingsPlugin({
              allowedHeadingLevels: [1, 2, 3, 4, 5, 6]
            }),
            quotePlugin(),
            listsPlugin(),
            thematicBreakPlugin(),
            linkDialogPlugin({
              linkAutocompleteSuggestions: ['https://google.com']
            }),
            imagePlugin({
              imageUploadHandler,
              imageAutocompleteSuggestions: ['https://picsum.photos/200/300', 'https://picsum.photos/200']
            }),
            linkPlugin(),
            tablePlugin(),
            directivesPlugin({ directiveDescriptors: [CalloutCustomDirectiveDescriptor, AdmonitionDirectiveDescriptor] }),
            markdownShortcutPlugin(),
            frontmatterPlugin()
          ]}
        />
      </header>
    </div>
          <button onClick={()=>{console.log(editorContent)}}></button>
      </div>
  );
}

export default CreateNote;