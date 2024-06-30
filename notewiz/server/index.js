//require('dotenv').config();
const express = require('express')
const mongoose = require("mongoose")
//require('dotenv').config();
const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors');
const UserModel = require('./models/User')
const NoteModel = require('./models/Note')
const session = require('express-session')
const bcrypt = require('bcrypt');

const app = express();

app.locals.LoginUser = null;

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors({origin: 'http://localhost:3000'}))

app.use(session({
    secret: '4416',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // for HTTP; set true for HTTPS
}));

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
        return res.status(400).json({ message: 'User name cannot be empty' });
    }

    try {
        // Check if the user already exists
        const existingUser = await UserModel.findOne({ username });

        if (existingUser) {
            const match = await bcrypt.compare(password, existingUser.password);
            if(match){
                // req.session.user = { username: existingUser.username, 
                //     password: existingUser.password, 
                //     preferName: existingUser.preferName};
                app.locals.LoginUser = { username: existingUser.username,
                  password: existingUser.password,
                  preferName: existingUser.preferName
                }
                res.status(200).json({ message: 'Login successfully'});
                // console.log("session data:", req.session.user);
            }else{
                res.status(201).json({ message: 'Wrong password'});
            }
        }else{
            return res.status(400).json({ message: "User name doesn't exist, please sign up" });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Failed to Login' });
    }
})



app.post('/signup', async (req, res)=>{
    const { username, password, ConfirmPassword } = req.body;

    //Check if the username is empty
    if (!username || username.trim() === '') {
        return res.status(400).json({ message: 'User name cannot be empty' });
    }

    try {
        // Check if the user already exists
        const existingUser = await UserModel.findOne({ username });

        if (existingUser) {
            res.json({ message: 'Username already exists' }); // Use status code 409 for conflict
        }else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await UserModel.create({ username, password: hashedPassword });
            res.status(201).json({ message: 'User created successfully', user: newUser });
        }
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Failed to sign up' });
    }
})

app.get('/Profile', (req, res)=>{
    try{
        // if(req.session.user){
        //     res.status(200).json({
        //         name: req.session.user.preferName,
        //         pass: req.session.user.password,
        //         defaultName: req.session.user.username
        //     })
        // }else{
        //     console.log("else part");
        //     console.log("session data:", req.session.user);
        //     return res.status(401).json({ name: "Unauthorized User" , pass: "Unauthorized Password"});
        // }
        if(app.locals.LoginUser){
          res.status(200).json({
              name: app.locals.LoginUser.preferName,
              pass: app.locals.LoginUser.password,
              defaultName: app.locals.LoginUser.username
          })
      }else{
          console.log("else part");
          return res.status(401).json({ name: "Unauthorized User" , pass: "Unauthorized Password"});
      }
    }catch(err){
        console.log("error part")
        res.status(500).json({name:'Internal Server Error', pass: 'Internal Server Error'});
    }
})

app.post('/Profile',async (req, res)=>{
    const { username, password } = req.body;

    //Check if the username is empty
    if (!username || username.trim() === '' || !password) {
        return res.status(400).json({ message: 'Prefer name and password cannot be empty' });
    }
    const name = app.locals.LoginUser.username;

    try {
        // Check if the user already exists

        const existingUser = await UserModel.findOne({ username: name });

        if (existingUser) {
            const hashedPassword = await bcrypt.hash(password, 10);
            app.locals.LoginUser = { username: existingUser.username,
                password: hashedPassword,
                preferName: username
              }
            await UserModel.updateOne({username:name}, {$set: {password: hashedPassword, preferName: username}})
            res.json({ message: 'Prefer Name and Password updated' , name: username, pass: password}); 
        }else{
            res.status(201).json({ message: 'Unauthorized user'});
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to Update' });
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