import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

function Signup(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [ConfirmPassword, setConfirm] = useState('');
    const [message, setMessage] = useState('');
    const [inputError, setInputError] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(event) {
      event.preventDefault();
      setInputError(''); // Reset input errors on new submission

      if (!username) {
        setMessage('Username cannot be empty');
        setInputError('username');
        return;
      }

      if (password !== ConfirmPassword || !password) {
        setMessage('Passwords do not match');
        setInputError('password');
        return;
      }

      try {
        const response = await axios.post("http://localhost:5000/signup", { username, password, ConfirmPassword });
        setMessage(response.data.message);
        if (response.data.message.includes('User created')) {
          navigate('/');
        } else if (response.data.message.includes('Username already exists')) {
          setInputError('username');
        }
      } catch (err) {
        setMessage(err.response ? err.response.data.message : 'An error occurred');
      }
    }

    return (
      <div className="SignupPage">
        <div className="signup-container">
          <h1 id="title">NoteWiz</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                style={{ borderColor: inputError === 'username' ? 'red' : '#ccc' }}
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{ borderColor: inputError === 'password' ? 'red' : '#ccc' }}
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Confirm password"
                value={ConfirmPassword}
                onChange={e => setConfirm(e.target.value)}
                style={{ borderColor: inputError === 'password' ? 'red' : '#ccc' }}
              />
            </div>
            <button type="submit">Sign up</button>
            <p><Link to="/" className="login-link">Already have an account? Log in!</Link></p>
            <div style={{ color: message.startsWith('User created') ? 'green' : 'red' }}>
              {message}
            </div>
          </form>
        </div>
      </div>
    );  
}

export default Signup;
