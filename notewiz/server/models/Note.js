const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: false,
    },
    content: {
        type: String,
        required: true
    },
    public: {
        type: Boolean,
        default: true
    },
    owner: {
        type: String,
        required: true
    },
    comment: {
        type: [commentSchema],
        default: []
    }
})

const NoteModel = mongoose.model("plainNote", NoteSchema)
module.exports = NoteModel