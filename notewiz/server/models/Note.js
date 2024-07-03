 const mongoose = require('mongoose')

 const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: false,
    },
    content: {
        type: String,
        required: true
    }
 })

 const NoteModel = mongoose.model("plainNote", NoteSchema)
 module.exports = NoteModel