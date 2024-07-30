import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import '@mdxeditor/editor/style.css';
import './editorStyles.css';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import MessageSharedNote from "./MessageSharedNote";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    AdmonitionDirectiveDescriptor,
    BlockTypeSelect,
    BoldItalicUnderlineToggles,
    ChangeCodeMirrorLanguage,
    codeBlockPlugin,
    codeMirrorPlugin,
    CodeToggle,
    ConditionalContents,
    CreateLink,
    diffSourcePlugin,
    DiffSourceToggleWrapper,
    directivesPlugin,
    frontmatterPlugin,
    headingsPlugin,
    imagePlugin,
    InsertAdmonition,
    InsertCodeBlock,
    InsertFrontmatter,
    InsertImage,
    InsertSandpack,
    InsertTable,
    linkDialogPlugin,
    linkPlugin,
    listsPlugin,
    markdownShortcutPlugin,
    MDXEditor,
    MDXEditorMethods,
    NestedLexicalEditor,
    quotePlugin,
    sandpackPlugin, setMarkdown$,
    ShowSandpackInfo,
    tablePlugin,
    thematicBreakPlugin,
    toolbarPlugin,
    UndoRedo,
    useCodeBlockEditorContext
} from '@mdxeditor/editor';
import axios from "axios";
import {red} from "@mui/material/colors";
import LoadingProcess from "./LoadingProcess";
import { notifySuccess } from "../ToastNotification";


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

function CreateNote() {
  const editorRef = React.useRef(null);
  const existingNote = localStorage.getItem('userNote');
  const mdxEditorRef = React.useRef(null)

  if (existingNote === null) {
      localStorage.setItem('userNote','');
  }
  const [editorContent, setEditorContent] = useState(localStorage.getItem("userNote"));
  const [loadingSummary, setloding] = useState(false);
  const [loadingConvert, setloadingConvert] = useState(false);
  const [title, setTitle] = useState('');
  const { noteid } = useParams();


  const oldVersionNote = localStorage.getItem('oldVersion')
  if(oldVersionNote === null){
      localStorage.setItem('oldVersion','Old Version')
  }
  const [oldVersion, setoldVersion] = useState(localStorage.getItem('oldVersion'));
  const changeCount = localStorage.getItem('userNoteCount');
  if (changeCount === null) {
      localStorage.setItem('userNoteCount', '0');
  }

    // Load the note from local storage when the component mounts
    useEffect(() => {
        if (noteid !== null) {
            return
        }
        console.log("fetch",editorContent);
        const savedNote = localStorage.getItem('userNote');
        if (savedNote) {
            setEditorContent(savedNote);
        }
    }, []);

    useEffect(() => {
        if (noteid === undefined) return
        async function fetchNote(id) {
            try{
                return await axios.post("http://localhost:5000/api/fetchNote", {id: id}, {withCredentials: true});
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log('Request canceled:', err.message);
                } else if (err.code === 'ECONNABORTED') {
                    console.error('Request timed out:', err);
                } else {
                    console.error('Error fetching note:', err);
                }
            }
        }
        if (noteid) {
            fetchNote(noteid).then(note => {
                if(note) {
                    setEditorContent(note.data.content || '');
                    setTitle(note.data.title || '');
                    localStorage.setItem("userNote",note.data.content);
                    mdxEditorRef.current.setMarkdown(note.data.content);
                }
            });
        }
    }, [])

    // Save the note to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('userNote', editorContent);
        let count = parseInt(localStorage.getItem('userNoteCount'),10);
        localStorage.setItem('userNoteCount', (count + 1).toString());
        if ((count + 1) > 0 && (count + 1) % 20 === 0){
            localStorage.setItem('oldVersion', editorContent);
            setoldVersion(localStorage.getItem('userNote'));
        }
    }, [editorContent]);

    const handleSave = async (e)=>{
        e.preventDefault();
        const note = { 'title': title, 'content': editorContent };

        let response
        if(noteid !== undefined) {
            response = await axios.patch(`http://localhost:5000/api/Notes/${noteid}`, note, {withCredentials: true});
        }
        else{
            response = await axios.post("http://localhost:5000/api/Notes", note, {withCredentials: true})
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            setloding(true);
            const notes = {editorContent};
            const response = await axios.post("http://localhost:5000/Note_Summarize", notes, {withCredentials: true});
            const resultRendering = response.data.summary + localStorage.getItem('userNote');
            setEditorContent(resultRendering);
            mdxEditorRef.current.setMarkdown(resultRendering);
        }catch (e) {
            console.log(e);
        }finally {
            setloding(false);
            notifySuccess("Successfully Summarize the Note");
        }

    };

    function handleShare() {
        if (!noteid) {
            alert("Please save the note first!");
        } else {


            const options = {
                autoClose: 60000,
                hideProgressBar: true,
                position: "top-center",
                pauseOnHover: true,
                progress: 0.2,
                closeOnClick: false,
                draggable: false,
                type: "info"
                // and so on ...
            };

            toast(<MessageSharedNote noteId={noteid} />, options);
        }
    }


    const buttons = [
        <Button key={0} onClick={(e)=>{handleSave(e); notifySuccess("Successfully Save")}} className='NoteButtons'>Save</Button>,
        <Button key={1} onClick={handleSubmit} className='NoteButtons'>Summarize</Button>,
        <Button key={2} onClick={handleShare} className='NoteButtons'>Share</Button>,
        <Button key={3} onClick={handleConvert} className='NoteButtons'>Q&A Generator</Button>
    ];

    async function handleConvert() {
        try {
            setloadingConvert(true);
            const notes = {editorContent};
            let response = await axios.post(
                "http://localhost:5000/api/note-to-flashcard",
                {note: notes, title: title},
                {withCredentials: true}
            );
            //notifySuccess("Successfully Convert to Flash Card");
            //alert("You can check the result in flash cards");
        } catch (error) {
            console.error("Error during conversion:", error);
            alert("An error occurred during conversion. Please try again.");
        }finally {
            setloadingConvert(false);
            notifySuccess("Successfully Convert to Flash Card");
        }
    }



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

                      ref={mdxEditorRef}

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

                          diffSourcePlugin({diffMarkdown: oldVersion, viewMode: 'rich-text'}),
                          toolbarPlugin({
                              toolbarContents: () => (
                                  <DiffSourceToggleWrapper style={{ backgroundColor: red}}>
                                      <UndoRedo/>
                                      <BlockTypeSelect/>
                                      <BoldItalicUnderlineToggles/>
                                      <CodeToggle/>
                                      <CreateLink/>
                                      <InsertTable/>
                                      <InsertAdmonition/>
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
          <Box sx={{
              display: 'flex',
              flexDirection: 'column',
          }}>
              <ButtonGroup size="large" aria-label="Small button group">
                  {buttons}
              </ButtonGroup>
          </Box>
          {loadingSummary && (
              <LoadingProcess Generate='Summary'/>
          )}
          {loadingConvert && (
              <LoadingProcess Generate='Flash Card'/>
          )}
      </div>
  );
}

export default CreateNote;