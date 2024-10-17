import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import '../index.css'; 

const AdminDashboard = () => {
  const [questionIn, setQuestionData] = useState({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    option5: ''
  });

  const [explanation, setExplanation] = useState({
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    option5: ''
  });
  const [correctAnswer, setCorrectAnswer] = useState('');
  

  const handleChange = (e) => {
    const { id, value } = e.target;

    setQuestionData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleCorrectAnswerChange = (e) => {
    setCorrectAnswer(e.target.value);
  };

 
    const handleExplanationChange = (e) => {
        const { id, value } = e.target;
        setExplanation((prevExplanations) => ({
          ...prevExplanations,
          [id]: value,
        }));
      };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    // Collect data on form submission
    const submittedData = {
      ...questionIn,
      correctAnswer,
      explanation,
    };

    console.log('Submitted Question Data: ', submittedData);

    // Reset form fields
    setQuestionData({
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      option5: '',
    });

    setExplanation({
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        option5: '',
      });

    setCorrectAnswer('');
    setExplanation('');
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard - Add Questions</h2>
      <form onSubmit={handleSubmit}>

        {/* Question */}
        <div className="mb-3">
          <label htmlFor="question" className="form-label">Question</label>
          <input
            type="text"
            className="form-control"
            id="question"
            value={questionIn.question}
            onChange={handleChange}
            placeholder="Enter the question"
          />
        </div>

        {/* Options */}
        {['option1', 'option2', 'option3', 'option4', 'option5'].map((option, index) => (
          <div key={index} className="mb-3">
            <label htmlFor={option} className="form-label">Option {index + 1}</label>
            <input
              type="text"
              className="form-control"
              id={option}
              value={questionIn[option]}
              onChange={handleChange}
              placeholder={`Enter option ${index + 1}`}
            />
          </div>
        ))}

           {/* Correct Answer Selection */}
           <div className="mb-3">
          <label htmlFor="correctAnswer" className="form-label">Select the Correct Answer</label>
          <select
            className="form-control"
            id="correctAnswer"
            value={correctAnswer}
            onChange={handleCorrectAnswerChange}
          >
            <option value="" disabled>Select correct answer</option>
            {['option1', 'option2', 'option3', 'option4', 'option5'].map((option, index) => (
              <option key={index} value={option}>
                {questionIn[option] || `Option ${index + 1}`}  
              </option>
            ))}
          </select>
        </div>

        {/* Explanations for Each Option */}
        {['option1', 'option2', 'option3', 'option4', 'option5'].map((option, index) => (
          <div key={index} className="mb-3">
            <label htmlFor={option} className="form-label">Explanation for Option {index + 1}</label>
            <textarea
              className="form-control"
              id={option}
              value={explanation[option]}
              onChange={handleExplanationChange}
              rows="2"
              placeholder={`Explain why option ${index + 1} is correct or incorrect`}
            />
          </div>
        ))}

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">Submit</button>

      </form>
    </div>
  );
};

export default AdminDashboard;
