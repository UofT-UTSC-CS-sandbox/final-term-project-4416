// src/components/SearchList.js

import React from 'react';
import Card from './flashcard/Card';

function SearchList({ filteredNotes }) {
    const filtered = filteredNotes.map(note => <Card key={note._id} note={note} />);
    return (
        <div>
            {filtered}
        </div>
    );
}

export default SearchList;
