const OpenAI = require('openai');
require('dotenv').config();
const express = require('express')
const mongoose = require("mongoose")
const showdown  = require('showdown')
const cors = require('cors');
const UserModel = require('./models/User')
const NoteModel = require('./models/Note')
const session = require('express-session')
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY,});

app.locals.LoginUser = null;
app.locals.note = "Hello world";

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // for HTTP; set true for HTTPS
}));

mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("Successfully connected Mongodb")
    })
    .catch(()=>{
        console.log("Failed connection")
    });

app.get('/session-test', (req, res) => {
    if (!req.session.test) req.session.test = [];
    req.session.test.push('1');
    return res.status(200).send(req.session);
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
                req.session.user = { username: existingUser.username,
                     password: existingUser.password,
                     preferName: existingUser.preferName};

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
    const notes = await NoteModel.find({owner: req.session.user.username});
    return res.status(200).json({data: notes});
})

app.post('/GlobalSearch', async (req, res) => {
    try {
        const notes = await NoteModel.find({ public: true });
        // console.log('Fetched notes from MongoDB:', notes); // 打印到终端
        return res.status(202).json({ data: notes });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

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
        console.log(req.body);
        let newNote = req.body;
        newNote.owner = req.session.user.username;
        await NoteModel.create(newNote);
        return res.status(200);
    } catch (err) {
        return res.status(500);
    }

})


app.post('/api/fetchNote', async (req, res) => {
    console.log("fetching note: " + req.body.id);

    try {
        let doc = await NoteModel.findById(req.body.id);
        console.log('Found document:', doc);
        let user = req.session.user;
        if (user.username !== doc.owner) {
            console.log(user.username + ' | ' + doc.owner + ' | not authorized');
            return res.status(401).send("not authorized");
        }
        return res.status(200).send(doc); // send the found document as the response
    } catch (err) {
        console.log(err);
        return res.status(500).send('Error occurred');
    }
});

app.post('/api/fetchPublicNote', async (req, res) => {
    // console.log("fetching note: " + req.body.id); // use req.body.id instead of req.id

    try {
        let doc = await NoteModel.findById(req.body.id);
        // console.log('Found document:', doc);
        if (doc.public === false) {
            return res.status(401).send('Not authorized');
        }

        //html conversion
        let converter = new showdown.Converter(),
            text      = '#'+doc.title+'\n'+doc.content,
            html      = converter.makeHtml(text);

        res.status(200).send(html); // send the found document as the response
    } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred');
    }
});

app.post('/api/searchNotes', async (req, res) => {
    const { term } = req.body;
    const notes = await NoteModel.find({
        owner: req.session.user.username,
        $or: [
            { title: new RegExp(term, 'i') },
            { content: new RegExp(term, 'i') }
        ]
    });
    return res.status(200).json({ data: notes });
});

app.post('/Note_Summarize', async (req, res) => {
    const notes = JSON.stringify(req.body);
    if (!notes) {
        console.log("Notes are not received");
        return res.status(400).json({ error: 'Notes are required' });
    }

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4-turbo',
            messages: [
                { role: 'system', content: 'You are going to summarize the notes' },
                { role: 'user', content: `Summarize the following notes in Markdown format, after summarize \n\n ${notes}` }
            ],
            max_tokens: 300,
            temperature: 0.6,
            top_p: 0.9,
            frequency_penalty: 0.5,
            presence_penalty: 0.5,
        });
        let GeneratedText = response.choices[0].message.content.trim();
        const summary = `${GeneratedText}\n***\n`;
        res.status(200).json({summary});
    } catch (error) {
        console.log("Error: ", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to summarize notes' });
    }
});

app.post('/api/addComment', async (req, res) => {
    const { noteId, content } = req.body;
    const username = req.session?.user?.username;
    // console.log("username:", username);
    // console.log("nodeid======", noteId);

    if (!username) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!content || content.trim() === '') {
        return res.status(400).json({ message: 'Comment content cannot be empty' });
    }

    try {
        const note = await NoteModel.findById(noteId);
        // console.log("nodeid======", note);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        const newComment = {
            username: username,
            content: content,
            timestamp: new Date()
        };
        // console.log("wuhahahahhahah!");

        note.comment.push(newComment);
        await note.save();

        res.status(200).json({ message: 'Comment added successfully', comment: newComment });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add comment', error });
    }
});

app.post('/api/deleteComment', async (req, res) => {
    const { noteId, commentId } = req.body;

    try {
        const note = await NoteModel.findById(noteId);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        const comment = note.comment.id(commentId);
        if (!comment) {
            // console.log("not find comment!!!");
            return res.status(404).json({ message: 'Comment not found' });
        }
        // console.log("good");
        // console.log("Comment", comment);
        await note.comment.pull(commentId);
        // console.log("good1");
        await note.save();
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (err) {
        // console.log("errrrrr!");
        res.status(500).json({ message: 'Error deleting comment', error: err });
    }
});


app.post('/api/getComments', async (req, res) => {
    const { noteId } = req.body;
    // console.log("noteId is :", noteId);

    try {
        const note = await NoteModel.findById(noteId);

        if (!note) {
            // console.log("does not find any thing");
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).send(note.comment);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get comments', error });
    }
});

app.listen(8000, ()=>{
    console.log('port connected at 8000');
})