// server.js (Backend)

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB (replace 'mongodb://localhost/studentDB' with your MongoDB connection string)
mongoose.connect('mongodb://localhost:27017/db2', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Define the Student schema
const studentSchema = new mongoose.Schema({
  name: String,
  universityCode: String,
  fatherName: String,
  // Add more fields as per your data model
});

// Create the Student model
const Student = mongoose.model('Student', studentSchema);

// Middleware for parsing JSON body
app.use(bodyParser.json());

// Search endpoint
app.post('/search', async (req, res) => {
  const { searchTerm } = req.body;

  try {
    const results = await Student.find({
      $or: [
        { name: searchTerm },
        { universityCode: searchTerm },
        { fatherName: searchTerm }
      ]
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while searching for student data." });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
