const mongoose = require('mongoose')

const config = require('../config/database')

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: {
        type: String
    },
    memo:{
        type: String,
        required: true 
    }

})

const Note = module.exports = mongoose.model('Note', NoteSchema);


module.exports.getNotesById = function(id, callback) {
    Note.findById(id, callback)
}

module.exports.addNote = function(newNote, callback) {
    newNote.save(callback); 
}