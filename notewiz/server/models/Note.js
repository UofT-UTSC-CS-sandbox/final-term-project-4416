const mongoose = require('mongoose')

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