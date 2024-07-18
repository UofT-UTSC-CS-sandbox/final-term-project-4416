import React from 'react';
import './Card.css';

function Card({ note }) {
    return (
      <div className="card-container">
        <div>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
          <p>Owner: {note.owner}</p>
        </div>
      </div>
    );
}

export default Card;
