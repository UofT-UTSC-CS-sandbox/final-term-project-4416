import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import ReactMarkdown from 'react-markdown';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { FlashcardArray } from "react-quizlet-flashcard";

const CreateNote = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { noteid } = useParams();

    useEffect(() => {
        async function fetchNote(id) {
            try{
                const response = await axios.post("http://localhost:5000/api/fetchNote", {id: id});
                return response;
            } catch (err) {
                console.error(err);
            }
        }
        if (noteid) {
            fetchNote(noteid).then(note => {
                if(note) {
                    setContent(note.data.content || '');
                    setTitle(note.data.title || '');
                }
            });
        }
    }, [noteid])

    const handleEditorChange = ({ text }) => {
        setContent(text);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const note = { title, content };
        const response = await axios.post("http://localhost:5000/api/createNotes", note)
    };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <MarkdownEditor
          value={content}
          style={{ height: '500px'}}
          renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
          onChange={handleEditorChange}
        />
        <button type="submit">Create Note</button>
      </form>
    </div>
  );
};

export default CreateNote;
