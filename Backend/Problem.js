//this is the blueprint;

const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  problemId: { type: Number, required: true, unique: true }, // Add this!
  title: { type: String, required: true },
  difficulty: { type: String, required: true },
  timeTaken: { type: Number },
  date: { type: Date, default: Date.now }
});

// Export the "Worker" so script.js can use it
module.exports = mongoose.model('Problem', problemSchema);