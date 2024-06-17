require('dotenv').config();
const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors');
const UserModel = require('./models/User')
const NoteModel = require('./models/Note')

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
                res.status(200).json({ message: 'Login successfully'});
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

// noteBrowser handler
app.post('/browser', async (req, res)=>{
    const notes = await NoteModel.find();   
    return res.status(200).json({data: notes});
})



app.post('/deleteNotes', async (req, res) => {
    //retrieve selected notes id from req
    const idsToDelete = req.body;

    try {
        await NoteModel.deleteMany({ _id: { $in: idsToDelete } });
        res.status(200).json({ message: 'Notes deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting notes', error: err });
    }
});

app.post('/api/createNotes', async (req, res)=>{
    try {
        await NoteModel.create(req.body);
        return res.status(200);
    } catch (err) {
        return res.status(500);
    }
    
})


app.post('/api/fetchNote', async (req, res) => {
    console.log("fetching note: " + req.body.id); // use req.body.id instead of req.id

    try {
        let doc = await NoteModel.findById(req.body.id);
        console.log('Found document:', doc);
        res.status(200).send(doc); // send the found document as the response
    } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred');
    }
});

app.listen(5000, ()=>{

    console.log('port connected at 5000');
})