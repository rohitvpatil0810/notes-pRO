const mongoose = require('mongoose');
const { isEmail } = require('validator');

const noteSchema = new mongoose.Schema(
    {
        id:{
            type: String,
            required: true
        },
        title: {
            type: String,
            required: [true, 'Title is required']
        },
        desc: {
            type: String,
            required: [true, 'Description is required']
        }
    },
    { timestamps: true }
)

const Note = mongoose.model('note', noteSchema);

module.exports = Note;