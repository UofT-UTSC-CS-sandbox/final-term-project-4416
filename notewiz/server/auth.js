require('dotenv').config();
const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors');
const UserModel = require('./models/User')

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

const url = "mongodb+srv://NoteWiz:4416@cluster0.1bzlqay.mongodb.net/UserInfo?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(url)
.then(()=>{
    console.log("Successfully connected Mongodb")
})
.catch(()=>{
    console.log("Failed connection")
})

app.post('/', async (req, res)=>{
    const { username, password } = req.body;

    // Check if the username is empty
    if (!username || username.trim() === '') {
        return res.status(400).json({ message: 'Username cannot be empty' });
    }

    try {
        // Check if the user already exists
        const existingUser = await UserModel.findOne({ username });

        if (existingUser) {
            if(existingUser.password === password){
                res.status(201).json({ message: 'Login successfully'});
            }else{
                res.status(201).json({ message: 'Wrong password'});
            }
        }else{
            return res.status(400).json({ message: "Username doesn't exist, please sign up" });
        }
        

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Failed to Login' });
    }
})



app.post('/signup', async (req, res)=>{
    const { username, password, ConfirmPassword } = req.body;

    // Check if the username is empty
    if (!username || username.trim() === '') {
        return res.status(400).json({ message: 'Username cannot be empty' });
    }

    // Check if the password matches the confirmation password
    if (password !== ConfirmPassword || password === '') {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    try {
        // Check if the user already exists
        const existingUser = await UserModel.findOne({ username });

        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' }); // Use status code 409 for conflict
        }

        // Create the new user if it doesn't exist
        const newUser = await UserModel.create({ username, password });
        res.status(201).json({ message: 'User created successfully', user: newUser });

    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Failed to sign up' });
    }
})


app.listen(5000, ()=>{
    console.log('port connected at 5000');
})