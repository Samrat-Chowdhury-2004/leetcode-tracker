// Step 1: The Imports
require('dotenv').config({ path: './new.env' });  //It loads your secret password from new.env into the computer's memory
const express = require('express');  //import express
const mongoose = require('mongoose'); // import mongoose
const Problem = require('./Problem');  //blueprints at the top in the import section

// Step 2: Initialize the express 
const app = express(); // server is born
app.use(express.json()); //server can read data

// 3. The actual connection attempt to the cloud
mongoose.connect(process.env.MONGO_URI)  //"Go look in the memory for that secret key we loaded in Step 1."
  .then(() => console.log("✅ SUCCESS: Cloud Fridge is connected!"))  //This is a Promise. It says, "If the connection works, run this "
  .catch(err => console.log("❌ ERROR: Connection failed!", err)); //This is the safety net. If your internet is off or your password is wrong, it catches the error and tells you exactly what went wrong instead of just crashing your whole computer.




  // 5. Create the "Entry Gate" to add new problems
app.post('/add-problem', async function(req, res) {
    try {
        // Create a new document based on our Blueprint (Schema)
        const newProblem = new Problem({
            title: req.body.title,
            difficulty: req.body.difficulty,
            timeTaken: req.body.timeTaken,
            link: req.body.link
        });

        // Push the document to the Cloud Fridge and WAIT for it to finish
        const savedProblem = await newProblem.save();

        // Send back a success code (201) and the saved data
        res.status(201).json({
            message: "Problem saved successfully! ✅",
            data: savedProblem
        });
    }
    catch (err) {
        // If something goes wrong, send an error code (500)
        res.status(500).json({ 
            message: "Error saving problem", 
            error: err.message 
        });
    }
});


// 6. The "Display" Gate: Get all problems
app.get('/all-problems', async function(req, res) {
    try {
        // .find() reaches out to MongoDB and says "Give me everything in the problems list"
        const allProblems = await Problem.find();
        
        // This sends the data (both problems) back to the user
        res.status(200).json(allProblems);
    } catch (err) {
        res.status(500).json({ 
            message: "Error fetching problems", 
            error: err.message 
        });
    }
});

// 7. The "Update" Gate: Change an existing problem
app.put('/update-problem/:id', async function(req, res) {
    try {
        // findByIdAndUpdate takes the ID from the URL and the new data from the body
        const updatedProblem = await Problem.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } // This ensures MongoDB returns the NEW updated data, not the old one
        );

        res.status(200).json({
            message: "Problem updated successfully! 🛠️",
            data: updatedProblem
        });
    } catch (err) {
        res.status(500).json({ message: "Error updating", error: err.message });
    }
});

// 8. The "Delete" Gate
app.delete('/delete-problem/:id', async function(req, res) {
    try {
        await Problem.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Deleted from Cloud! 🗑️" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



//This is the end of the js file
// Start the Server
const PORT = 3000; // port is a random const used to indicate no 3000 which is the port no used for web dev
app.listen(PORT, function() {  //app is the name of server see line number 8 by the listen and port number we are starting the server
    console.log("Server is running on http://localhost:3000");
});