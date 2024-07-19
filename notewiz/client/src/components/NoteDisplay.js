import React, { useEffect, useState } from 'react';
import axios from "axios";
import parse from 'html-react-parser';
import './NoteDisplay.css';

const NoteDisplay = ({ nid }) => {
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                setLoading(true);
                let response = await axios.post("http://localhost:8000/api/fetchPublicNote", { id: nid });
                setNote(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching note", error);
                setError(error);
                setLoading(false);
            }
        };

        fetchNote();
    }, [nid]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading</div>;
    }

    if (!note) {
        return <div>No found</div>;
    }

    return (
        <div id='publicNote'>
            {parse(note)}
            <div id='comments'>
                <h3>Comments:</h3>
            </div>
        </div>
    );
};

export default NoteDisplay;
