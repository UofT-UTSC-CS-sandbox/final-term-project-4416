import React, { useState, useEffect } from "react";
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios'
import './NoteBrowser.css'

function NoteBrowser(props) {
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [deleteMode, setDeleteMode] = useState(false);
    const [selectedNotes, setSelectedNotes] = useState(new Set());

    async function retrieveNotes() {
        try {
            const response = await axios.post("http://localhost:5000/browser", {a: "get notes"});
            setNotes(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        retrieveNotes();
    }, []); // Empty dependency array means this effect runs once when the component mounts.

    function toggleNoteSelection(id) {
        const newSelectedNotes = new Set(selectedNotes);
        if (newSelectedNotes.has(id)) {
            newSelectedNotes.delete(id);
        } else {
            newSelectedNotes.add(id);
        }
        setSelectedNotes(newSelectedNotes);
    }

    async function deleteSelectedNotes() {
        try {
            await axios.post("http://localhost:5000/deleteNotes", Array.from(selectedNotes));
            setSelectedNotes(new Set());
            retrieveNotes();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="NoteBrowser">
            <h1>Notes</h1>
            <button onClick={() => setDeleteMode(!deleteMode)}>
                {deleteMode ? "Cancel" : "Delete Notes"}
            </button>
            {deleteMode && (
                <button onClick={deleteSelectedNotes}>
                    Delete Selected Notes
                </button>
            )}
            <div className="grid-container">
            {notes.map(note => (
                <div 
                    key={note._id} 
                    className={`grid-item ${deleteMode ? "deletion-mode" : ""} ${selectedNotes.has(note._id) ? "selected" : ""}`}
                    onClick={deleteMode ? () => toggleNoteSelection(note._id) : () => navigate(`/Note/${note._id}`)}
                >
                    <h2>{note.title}</h2>
                    <p>{note.content}</p>
                </div>
            ))}
            </div>
        </div>
    )
}
export default NoteBrowser;
