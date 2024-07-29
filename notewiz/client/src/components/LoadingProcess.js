import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './LoadingProcess.css'

function LoadingProcess(props) {
    return (
        <div className="modal-loading">
            <div className="modal-content-loading">
                <Box sx={{display: 'flex'}}>
                    <p>Generating {props.Generate}, Please wait....</p>
                    <div className='CircularProgress'>
                        <CircularProgress/>
                    </div>

                </Box>
            </div>
        </div>
    );
}

export default LoadingProcess;