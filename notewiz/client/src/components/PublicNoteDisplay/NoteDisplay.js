import React, { useEffect, useState } from 'react';
import axios from "axios";
import parse from 'html-react-parser';
import './NoteDisplay.css';
import CommentSystem from './CommentSystem';
import {useParams} from "react-router-dom";

const NoteDisplay = ({ nid }) => {
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                setLoading(true);
                let response = await axios.post("http://localhost:5000/api/fetchPublicNote", { id: nid });
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
                <CommentSystem noteId={id} />
            </div>
        </div>
    );
};

export default NoteDisplay;
