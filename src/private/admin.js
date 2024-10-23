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
    const { name, value } = e.target;
    setQuestionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCorrectAnswerChange = (e) => {
    setCorrectAnswer(e.target.value);
  };

  const handleExplanationChange = (e) => {
    const { name, value } = e.target;
    setExplanation((prevExplanations) => ({
      ...prevExplanations,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!questionIn.question || !correctAnswer) {
      alert("Please fill in all required fields.");
      return;
    }

    const options = [
      questionIn.option1,
      questionIn.option2,
      questionIn.option3,
      questionIn.option4,
      questionIn.option5,
    ];

    const submittedData = {
      question: questionIn.question,
      options,
      correctAnswer,
      explanation,
    };

    try {
      const response = await fetch('http://localhost:3001/upload-question', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submittedData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result); // Log success message

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

      alert(result.message); // Show success message in UI

    } catch (error) {
      console.error('Error uploading question:', error);
      alert('Failed to upload question, please try again.');
    }
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
            name="question"
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
      name={option}  // Use name instead of id here
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

        {/* Options and Explanations */}
        {/* {['option1', 'option2', 'option3', 'option4', 'option5'].map((option, index) => (
          <div key={index} className="mb-3">
            <label htmlFor={option} className="form-label">Option {index + 1}</label>
            <textarea
              type="text"
              className="form-control"
              name={option}
              value={questionIn[option]}
              onChange={handleChange}
              placeholder={`Enter option ${index + 1}`}
            /> */}
              {['option1', 'option2', 'option3', 'option4', 'option5'].map((option, index) => (
          <div key={index} className="mb-3">
            <label htmlFor={option} className="form-label">Explanation for Option {index + 1}</label>
            <textarea
              className="form-control"
              name={option}
              value={explanation[option]}
              onChange={handleExplanationChange}
              rows="2"
              placeholder={`Explain why option ${index + 1} is correct or incorrect`}
            />
          </div>
        ))}
            {/* <label htmlFor={`explanation-${option}`} className="form-label">Explanation for Option {index + 1}</label>
            <textarea
              className="form-control"
              name={option}
              value={explanation[option]}
              onChange={handleExplanationChange}
              rows="2"
              placeholder={`Explain why option ${index + 1} is correct or incorrect`}
            /> */}

   

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AdminDashboard;
