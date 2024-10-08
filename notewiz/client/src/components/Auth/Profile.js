import React, { useState , useEffect}from "react";
import "./Profile.css"
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function Profile({logout}){

    const [OriginUsername, setOUsername] = useState('');
    const [OriginPassword, setOPassword] = useState('');
    const [message, setMessage] = useState('');
    const [inputError, setInputError] = useState('');
    const [defaultName, setDefaultName] = useState('');

    const navigate = useNavigate();

    const [username,setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const response = await axios.get('http://localhost:5000/Profile',{withCredentials: true});
                setOUsername(response.data.name);
                setOPassword(response.data.pass);
                if(!response.data.name){
                    setDefaultName(response.data.defaultName)
                }
            }catch(err){
                setOUsername("err");
                setOPassword("err");
            }
        };
        fetchData();
    },[]);

    const handleLogout = async()=>{
        // localStorage.removeItem("userNote");
        // localStorage.removeItem("NoteSummary");
        localStorage.clear();
        logout();
        navigate('/');
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setInputError(''); // Reset input errors on new submission

        if (!username) {
            setMessage('Prefer name cannot be empty');
            setInputError('username');
            return;
        }

        if(!password){
            setMessage('Password cannot be empty');
            setInputError('password');
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/Profile", { username, password },{withCredentials: true});
            setMessage(response.data.message);
            if (response.data.message.includes('updated')) {
                setMessage("Successfully updated prefer name and password");
                setOUsername(response.data.name);
                setOPassword(response.data.pass);
            }else{
                setMessage("Failed to update");
            }
        } catch (err) {
            setMessage(err.response ? err.response.data.message : 'An error occurred');
        }
    }

    return (
        <div className="Profile">
            <div className="Profile-container">
                <h2 className="title">Hello, {OriginUsername || defaultName}!</h2>
                <form >
                    <div className="input-group">
                        <label>Prefer Name</label>
                        <input
                            type="text"
                            placeholder={OriginUsername}
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            style={{ borderColor: inputError === 'username' ? 'red' : '#ccc' }}
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"

                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={{ borderColor: inputError === 'password' ? 'red' : '#ccc' }}
                        />
                    </div>
                    <div className="buttonInProfile">
                        {/*<button type="button" id = "button1"onClick={handleSubmit}>Save changes</button>*/}
                        {/*<button type="button" id="button2" onClick={handleLogout}>Log out</button>*/}
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'flex-end'
                        }}>
                            <Button variant="outlined" onClick={handleSubmit} className='NoteButtons'
                                    sx={{ marginRight: 2 , fontSize: '1.25rem', padding: '12px 24px'}}>Save</Button>
                            <Button variant="outlined" onClick={handleLogout} className='NoteButtons'
                                    sx={{ fontSize: '1.25rem', padding: '12px 24px'}}>Log out</Button>
                        </Box>
                        <div style={{ color: message.startsWith('Successfully') ? 'green' : 'red' }}>
                            {message}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Profile;