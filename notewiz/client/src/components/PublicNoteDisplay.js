import React from 'react';
import NoteDisplay from './NoteDisplay';
import { useParams } from 'react-router-dom';

function PublicNoteDisplay() {
    const { id } = useParams(); // get the id from the URL

    return <div>
        <NoteDisplay nid={id} />
    </div>;
}

export default PublicNoteDisplay;