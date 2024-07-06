import React, { useEffect, useState } from 'react';
import axios from "axios";
import parse from 'html-react-parser';
import './NoteDisplay.css'

const NoteDisplay = ({nid}) => {
    const [note, setNote] = useState(null);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                let response = await axios.post("http://localhost:5000/api/fetchPublicNote", {id: nid});
                setNote(response.data);
            } catch (error) {
                console.error("Error fetching note", error);
            }
        };

        fetchNote();
    }, [nid]);

    if (!note) {
        return <div>Loading...</div>;
    }

    return (
        <div id={'publicNote'}>
            {parse(note)}
            {/* TODO: add more JS here */}

            <div id={'comments'}>
                <h3>Comments:</h3>
            </div>
        </div>
    );
}

export default NoteDisplay;