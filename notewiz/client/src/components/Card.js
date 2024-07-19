import React from 'react';
import './Card.css';

function Card({ note }) {
  const tContent = (content, maxLength) => {
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + '...';
    }
    return content;
  };

  const handleClick = () => {
    window.open("/shared-note/" + note._id, "_blank");
  };

  return (
    <div className="card-container" onClick={handleClick}>
      <div>
        <h2>{tContent(note.title, 8)}</h2>
        <p>{tContent(note.content, 8)}</p>
        <p>Owner: {tContent(note.owner, 8)}</p>
      </div>
    </div>
  );
}

export default Card;
