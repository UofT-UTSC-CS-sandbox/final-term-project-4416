import React, { useState } from 'react';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import { FlashcardArray } from "react-quizlet-flashcard";

const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleEditorChange = ({ html, text }) => {
    setContent(text);
  };

  const handleFlashCardClick = () => {
    setShowFlashCard(true);
  };

  const showFlashCard = () => {
    // Define what happens when the flash card button is clicked
    navigate('/flashcards-list');
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const note = { title, content };
    const response = await fetch('http://localhost:5000/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    });
    if (response.ok) {
      setTitle('');
      setContent('');
    }
  };
  


  return (
    <div>
      <h2>Create a New Note</h2>
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
          style={{ height: '500px' }}
          renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
          onChange={handleEditorChange}
        />
        <button type="submit">Create Note</button>
        <button type="button" onClick={showFlashCard}>Flashcard</button>
      </form>
    </div>
  );
};

export default CreateNote;
