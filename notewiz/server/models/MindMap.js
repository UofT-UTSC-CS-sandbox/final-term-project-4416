const mongoose = require('mongoose');

const MapSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true
    },
    content: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    }
})

const MindMapModel = mongoose.model('MindMap', MapSchema);
module.exports = MindMapModel