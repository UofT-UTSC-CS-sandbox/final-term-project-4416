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
  const existingNote = localStorage.getItem('userNote');
  if (existingNote === null) {
      localStorage.setItem('userNote','');
  }
  const [editorContent, setEditorContent] = useState(localStorage.getItem("userNote"));
  const [loading, setloding] = useState(false);
  const [title, setTitle] = useState('');

    // Load the note from local storage when the component mounts
    useEffect(() => {
        console.log("fetch",editorContent);
        const savedNote = localStorage.getItem('userNote');
        if (savedNote) {
            setEditorContent(savedNote);
        }
    }, []);

    // Save the note to local storage whenever it changes
    useEffect(() => {
        console.log(editorContent);
        localStorage.setItem('userNote', editorContent);
    }, [editorContent]);

    const handleSave = async (e)=>{
        e.preventDefault();
        const note = { title, editorContent };
        const response = await axios.post("http://localhost:5000/api/createNotes", note)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setloding(true);
            const notes = {editorContent};
            const response = await axios.post("http://localhost:5000/Note_Summarize", notes);
            console.log(response.data.summary);
            const resultRendering = response.data.summary + localStorage.getItem('userNote');
            localStorage.setItem('userNote',resultRendering);
            setEditorContent(resultRendering);

        }catch (e) {
            console.log(e);
        }finally {
            setloding(false);
            location.reload();
        }

    };

  return (
      <div id={"operation"}>
          <div className="App">
              <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  />
              <header className="App-header">
                  <MDXEditor
                      contentEditableClassName="prose"

                      markdown={editorContent}
                      onChange={setEditorContent}


                      plugins={[
                          codeBlockPlugin({
                              defaultCodeBlockLanguage: 'js',
                              codeBlockEditorDescriptors: [PlainTextCodeEditorDescriptor]
                          }),
                          sandpackPlugin({sandpackConfig: simpleSandpackConfig}),
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

                          diffSourcePlugin({diffMarkdown: 'An older version', viewMode: 'rich-text'}),

                          toolbarPlugin({
                              toolbarContents: () => (
                                  <DiffSourceToggleWrapper>
                                      <UndoRedo/>
                                      <BlockTypeSelect/>
                                      <BoldItalicUnderlineToggles/>
                                      <CodeToggle/>
                                      <CreateLink/>
                                      <InsertImage/>
                                      <InsertTable/>
                                      <InsertAdmonition/>
                                      <InsertFrontmatter/>
                                      <ConditionalContents
                                          options={[
                                              {
                                                  when: (editor) => editor?.editorType === 'codeblock',
                                                  contents: () => <ChangeCodeMirrorLanguage/>
                                              },
                                              {
                                                  when: (editor) => editor?.editorType === 'sandpack',
                                                  contents: () => <ShowSandpackInfo/>
                                              },
                                              {
                                                  fallback: () => (<>
                                                      <InsertCodeBlock/>
                                                      <InsertSandpack/>
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
                          directivesPlugin({directiveDescriptors: [CalloutCustomDirectiveDescriptor, AdmonitionDirectiveDescriptor]}),
                          markdownShortcutPlugin(),
                          frontmatterPlugin()
                      ]}
                  />
              </header>
          </div>
          <button onClick={handleSubmit}>Generate</button>
          <button onClick={handleSave}>Save</button>
          {loading && (
              <div className="modal">
                  <div className="modal-content">
                      <p>Generating summary, please wait...</p>
                  </div>
              </div>
          )}
      </div>
  );
}

export default CreateNote;