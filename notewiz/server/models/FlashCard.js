const mongoose = require('mongoose');

const FlashSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true
    },
    front:{
        title: { type: String, required: true },
        content: { type: String, required: true },
    },
    back:{
        title: { type: String},
        content: { type: String, required: true },
    }
})

const FlashCardModel = mongoose.model('FlashCard', FlashSchema);
module.exports = FlashCardModel