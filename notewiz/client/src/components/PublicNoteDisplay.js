import React, { useRef } from 'react';
import NoteDisplay from './NoteDisplay';
import { useParams } from 'react-router-dom';
import useCanvasBackground from './canvas';

function PublicNoteDisplay() {
    const { id } = useParams();
    const canvasRef = useRef(null);

    useCanvasBackground(canvasRef);

    return (
        <div style={{ position: 'relative', zIndex: 1 }}>
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1,
                    background: 'black',
                }}
            ></canvas>
            <NoteDisplay nid={id} />
        </div>
    );
}

export default PublicNoteDisplay;
