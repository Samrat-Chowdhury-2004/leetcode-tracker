//this is the blueprint;

const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true, 
        unique: true, // This is the Brick Wall!
        trim: true    // Pro tip: removes accidental spaces like " Two Sum"
    },
    difficulty: String,
    link: String,
    timeTaken: Number,
    dateAdded: { type: Date, default: Date.now }
});

// Export the "Worker" so script.js can use it
module.exports = mongoose.model('Problem', problemSchema);