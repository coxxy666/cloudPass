// const mongoose = require('mongoose');

// // Connect to MongoDB (use your MongoDB connection string here)
// const uri = 'mongodb://localhost:27017/';  
// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('MongoDB connected successfully'))
//   .catch((error) => console.error('MongoDB connection error:', error));

// // Define the schema for a question
// const questionSchema = new mongoose.Schema({
//   question: {
//     type: String,
//     required: false,  // Still required
//   },
//   options: {
//     type: [String],  // Still required
//     required: true,
//   },
//   correctAnswer: {
//     type: String,
//     required: true,  // Still required
//   },
//   explanation: {
//     type: String,
//     required: false,  // Now optional
//   },
// }, {
//   timestamps: true  // Automatically add `createdAt` and `updatedAt` fields
// });


// // Create a model for the question
// const Question = mongoose.model('Question', questionSchema);

// // Export the Question model so it can be used in app.js
// module.exports = Question;


const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String,
  explanation: Object,
});

module.exports = mongoose.model('Question', questionSchema);
