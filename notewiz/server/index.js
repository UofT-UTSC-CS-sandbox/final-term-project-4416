const OpenAI = require('openai');
require('dotenv').config();
const express = require('express')
const mongoose = require("mongoose")
const showdown = require('showdown')
const cors = require('cors');
const UserModel = require('./models/User')
const NoteModel = require('./models/Note')
const FlashModel = require('./models/FlashCard')
const MapModel = require('./models/MindMap')
const session = require('express-session')
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
    .then(() => {
        console.log("Successfully connected Mongodb")
    })
    .catch(() => {
        console.log("Failed connection")
    });

app.post('/', async (req, res) => {
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
        if(req.session.user){
            res.status(200).json({
                name: req.session.user.preferName,
                pass: req.session.user.password,
                defaultName: req.session.user.username
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
    // const name = app.locals.LoginUser.username;
    const name = req.session.user.username;

    try {
        // Check if the user already exists

        const existingUser = await UserModel.findOne({ username: name });

        if (existingUser) {
            const hashedPassword = await bcrypt.hash(password, 10);
            req.session.user = { username: existingUser.username,
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
        //console.log(req.body);
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

// Flash Card


app.get('/api/fetchFlashCardSet', async (req, res) => {
    const username = req.session.user.username;
    try{
        if (!req.session.user.username || !req.session.user) {
            return res.send([]);
        }
        const cards = await FlashModel.find({owner: username});
        if(cards){
            //console.log(cards);
            res.status(200).send(cards);
        }
    }catch (e) {
        console.log("Error fetching FlashCardSet");
        console.log(e);
    }
});

app.post('/api/deleteFlashCard', async (req, res) => {
    try {
        const id = req.body.id;
        const username = req.session.user.username;
        const count = await FlashModel.countDocuments({ owner: username });
        // console.log(`deleting id: ${id}, and number of card before : ${count}`);

        const flashCardToDelete = await FlashModel.findOne({ owner: username, id: id });
        if(flashCardToDelete){
            const deleteOperation = await FlashModel.deleteOne({ owner: username, id: id });
            if (id !== (count - 1)) {
                await FlashModel.updateMany(
                    { owner: username, id: { $gt: id } },
                    { $inc: { id: -1 } }
                );
            }
        }
        res.status(200).send({ message: 'FlashCard deleted successfully' });
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'Error deleting FlashCard' });
    }
});


app.post('/api/createFlashCard', async (req, res) => {

    // console.log(req.body);
    const username = req.session.user.username;
    try{
        const id = await FlashModel.countDocuments({owner: username});
        const newFlashCard = await FlashModel.create({owner: username, id: id,
            front:{
                title: req.body.frontTitle,
                content: req.body.frontContent,
            },
            back:{
                title: req.body.backTitle,
                content: req.body.backContent,
            }
        });
    }catch(err){
        console.log(err)
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


// Mind Map
app.get('/api/fetchMindMapSet', async (req, res) => {
    const username = req.session.user.username;
    try{
        if (!req.session.user.username || !req.session.user) {
            return res.send([]);
        }
        const maps = await MapModel.find({owner: username});
        if(maps){
            //console.log(cards);
            res.status(200).send(maps);
        }
    }catch (e) {
        console.log("Error fetching MindMapSet");
        console.log(e);
    }
});

app.get('/api/fetchMindMapById/:id', async (req, res) => {
    const {id} = req.params;

    try{
        const map = await MapModel.findById(id);

        if(map){
            //console.log(cards);
            res.status(200).send(map);
        }
    }catch (e) {
        console.log("Error fetching MindMap");
        console.log(e);
    }
});

app.post('/api/createMindMap', async (req, res) => {

    // console.log(req.body);
    const username = req.session.user.username;
    try{
        const id = await MapModel.countDocuments({owner: username});
        const newMindMap = await MapModel.create({owner: username, id: id, content: req.body}); // not enough
    }catch(err){
        console.log(err)
    }
});

app.post('/api/deleteMindMap', async (req, res) => {
    try {
        const id = req.body.id;
        const username = req.session.user.username;
        const count = await MapModel.countDocuments({ owner: username });
        // console.log(`deleting id: ${id}, and number of card before : ${count}`);

        const MindMapToDelete = await MapModel.findOne({ owner: username, id: id });
        if(MindMapToDelete){
            const deleteOperation = await MapModel.deleteOne({ owner: username, id: id });
            if (id !== (count - 1)) {
                await MapModel.updateMany(
                    { owner: username, id: { $gt: id } },
                    { $inc: { id: -1, 'content.id': -1 } }
                );
            }
        }
        res.status(200).send({ message: 'MindMap deleted successfully' });
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'Error deleting MindMap' });
    }
});



app.post('/api/note-to-flashcard', async (req, res) => {
    const notes = req.body.note.editorContent;
    const title = req.body.title;
    if (!notes) {
        console.log("Notes are not received");
        return res.status(400).json({ error: 'Notes are required' });
    }

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4-turbo',
            messages: [
                { role: 'system', content: 'You are a professional note analyser that helps people with reviewing on' +
                        ' their note, you do not output anything other than json formatted string'
                        +'Given the following note, please output two question/answer set that helps user with reviewing the note. The output should be in json format. The output has 2 field, question and answer. You should not output anything other than the json string. Do not include json string in a markdown codeblock. Do not include \\" in your response. Do use double quote for string.'},
                { role: 'user', content: `${notes}` }
            ],
            max_tokens: 4096,
            temperature: 0.2,
            top_p: 0.9,
            frequency_penalty: 0.5,
            presence_penalty: 0.5,
        });
        let GeneratedText = response.choices[0].message.content.trim();

        console.log(GeneratedText);

        // Extract question-answer pairs from the string
        let qaPairs = GeneratedText.match(/\{[^}]*?\}/g).map(JSON.parse);

        let count = await FlashModel.countDocuments({owner: req.session.user.username});

        qaPairs.forEach((item, index) => {
            const flashCard = new FlashModel({
                owner: req.session.user.username,
                id: count+index,
                front:{
                    title: title + '-Q' + index,
                    content: item.question
                },
                back:{
                    title: 'A',
                    content: item.answer
                }
            });

            flashCard.save()
                .then(() => console.log('Flash card saved successfully'))
                .catch(err => console.error('Error saving flash card:', err));
        });

        res.status(200).json({message: 'Successfully Generate Flash Card'});
    } catch (error) {
        console.log("Error: ", error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Convert to flashcard failed' });
    }
});

app.post('/MindMap/AutoSave', async (req, res) => {
    const username = req.session.user.username;
    const update = req.body;
    //console.log(req.body);
    try {
        // Find the document
        const document = await MapModel.findOne({ owner: username, id: update.id });

        if (document) {
            // Update the document
            const updateOperation = await MapModel.updateOne({id: update.id, owner: username},
                {$set: {owner: username, id: update.id, content: update}});
            res.status(200).send('Update successful');
        } else {
            console.log('Document not found');
            res.status(404).send('Document not found');
        }
    } catch (err) {
        console.log('Error during update operation:', err);
        res.status(500).send('Internal server error');
    }
});



app.listen(5000, ()=>{
    console.log('port connected at 5000');
})