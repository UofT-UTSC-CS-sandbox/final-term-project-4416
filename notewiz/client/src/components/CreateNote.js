import React, { useState } from 'react';
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleEditorChange = ({ text }) => {
    setContent(text);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const note = { title, content };
    const response = await fetch('http://localhost:5000/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    });
    if (response.ok) {
      setTitle('');
      setContent('');
    }
  };

  return (
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
        renderHTML={(text) => <ReactMarkdown source={text} />}
        onChange={handleEditorChange}
      />
      <button type="submit">Create Note</button>
    </form>
  );
};

export default CreateNote;
