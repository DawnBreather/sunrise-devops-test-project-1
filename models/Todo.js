const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const Todo = new Schema({
    task: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Todo',Todo);