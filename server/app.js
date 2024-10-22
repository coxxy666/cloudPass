// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const Question = require('./database'); // Assuming Question model is in the models directory

// const app = express();
// app.use(express.json());
// const PORT = 3001;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB connection
// const uri = 'mongodb://localhost:27017/';
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected successfully'))
//   .catch((error) => console.error('MongoDB connection error:', error));

// // POST request handler to upload a question
// // app.post('/upload-question', async (req, res) => {
// //   try {
// //     const { question, option1, option2, option3, option4, option5, correctAnswer, explanation } = req.body;
    
// //     // Create new question object
// //     const newQuestion = new Question({
// //       question,
// //       options: [option1, option2, option3, option4, option5],
// //       correctAnswer,
// //       explanation
// //     });

// //     // Save to database
// //     await newQuestion.save();

// //     res.status(200).json({ message: 'Question uploaded successfully!' });
// //   } catch (error) {
// //     console.error('Error saving question:', error);
// //     res.status(500).json({ message: 'Failed to upload question, please try again.' });
// //   }
// // });

// app.post('/upload-question', async (req, res) => {
//   const questionData = req.body;
  
//   console.log('Received question data:', questionData);  // <-- Log the incoming data

//   try {
//     const newQuestion = new Question(questionData);
//     await newQuestion.save();
//     res.status(200).json({ message: 'Question uploaded successfully!' });
//   } catch (error) {
//     console.error('Error saving question:', error);
//     res.status(500).json({ message: 'Failed to upload question, please try again.' });
//   }
// });


// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Question = require('./database'); // Import the model

const app = express();
app.use(cors());

const bodyParser = require('body-parser');  // Include body-parser

app.use(bodyParser.json());  // Use body-parser middleware for parsing JSON


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true });

// API route to get questions
app.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/upload-question', async (req, res) => {
  try {
    const { question, options, correctAnswer, explanation } = req.body;
    const newQuestion = new Question({ question, options, correctAnswer, explanation });

    await newQuestion.save();
    res.status(200).json({ message: 'Question uploaded successfully!' });
  } catch (error) {
    console.error('Error saving question:', error);
    res.status(500).json({ message: 'Failed to upload question, please try again.' });
  }
});
const QuestionDelete = require('./database'); // Ensure this is the correct path to your Question model

// IDs of the documents you want to delete
const idsToDelete = [
  '6716194a6905c1a4b3883dab',
  '67161b9b9443736ad59c2371',
  '67161df39443736ad59c2374',
  '67161e941ce07461d22a11cf'
];

// Delete the documents
QuestionDelete.deleteMany({ _id: { $in: idsToDelete } })
  .then(() => {
    console.log('Documents deleted successfully');
  })
  .catch(err => {
    console.log('Error while deleting documents:', err);
  });



// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
