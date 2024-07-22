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
})

const MindMapModel = mongoose.model('MindMap', MapSchema);
module.exports = MindMapModel