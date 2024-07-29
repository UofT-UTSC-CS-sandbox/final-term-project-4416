import React, { useEffect, useState } from 'react';
import './MessageSharedNote.css'
import axios from "axios";

const MessageSharedNote = ({noteId}) => {
    let shareableLink = `http://localhost:3000/shared-note/${noteId}`;

    async function handlePublicityChange(event) {
        const isChecked = event.target.checked;
        try {
            const response = await axios.patch(`http://localhost:5000/api/Notes/${noteId}/setPublicity`, { public: isChecked });
            console.log(response.data);
        } catch (error) {
            console.log('Error updating note publicity:', error);
        }
    }


    return (
        <div className="message-shared-note">
            <p>share link: {shareableLink}</p>

            <div style={{display: 'flex', position:'relative'}}>
                <p>set publicity</p>
                <label className="switch">
                    <input type="checkbox" onChange={handlePublicityChange}/>
                    <span className="slider round"></span>
                </label>
            </div>
        </div>
    )
}

export default MessageSharedNote;