import React, { useRef } from 'react';
import NoteDisplay from './NoteDisplay';
import { useParams } from 'react-router-dom';
import useCanvasBackground from './canvas';
import './publicNoteDisplay.css';

function PublicNoteDisplay() {
    const { id } = useParams();
    const canvasRef = useRef(null);

    useCanvasBackground(canvasRef);

    return (
        <div className="relative-container">
            <canvas
                ref={canvasRef}
                className="canvas-background"
            ></canvas>
            <NoteDisplay nid={id} />
        </div>
    );
}

export default PublicNoteDisplay;
