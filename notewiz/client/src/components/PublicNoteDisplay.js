import React from 'react';
import NoteDisplay from './NoteDisplay';
import { useParams } from 'react-router-dom';
import CommentSystem from './CommentSystem'; 

function PublicNoteDisplay() {
    const { id } = useParams(); 

    return (
        <div>
            <NoteDisplay nid={id} />
        </div>
    );
}

export default PublicNoteDisplay;
