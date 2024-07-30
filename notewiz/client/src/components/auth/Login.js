import React, {useRef, useState} from "react";
import "./Login.css"
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios'
import useCanvasBackground from '../Canvas/canvas';
import '../PublicNoteDisplay/publicNoteDisplay.css'


function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');
    const [inputError, setInputError] = useState('');

    const navigate = useNavigate();

    const canvasRef = useRef(null);
    useCanvasBackground(canvasRef);

    async function handleSubmit(event) {
        event.preventDefault();
        setInputError(''); // Reset input errors on new submission
        setMessage('');

        if (!username) {
            setMessage('User name cannot be empty');
            setInputError('username');
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/", {username, password}, {withCredentials: true});
            setMessage(response.data.message);
            if (response.data.message.includes('successfully')) {
                navigate('/Note');
            } else if (response.data.message.includes('Wrong')) {
                setInputError('password');
            } else if (response.data.message.includes("Username doesn't exist")) {
                setInputError('username');
            }
        } catch (err) {
            setMessage(err.response ? err.response.data.message : 'An error occurred');
        }
    }


    return (
        <div className="relative-container">
            <canvas
                ref={canvasRef}
                className="canvas-background"
            ></canvas>
            <div className="LoginPage">
                <div className="login-container">
                    <h1 id="title">NoteWiz</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                style={{borderColor: inputError === 'username' ? 'red' : '#ccc'}}
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                style={{borderColor: inputError === 'password' ? 'red' : '#ccc'}}
                            />
                        </div>
                        <button className="submit-button-2" type="submit">Log in</button>
                        <p><Link to="/signup" className="signup-link">Don't have account? Create!</Link></p>
                        <div style={{color: message.startsWith('User created') ? 'green' : 'red'}}>
                            {message}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;