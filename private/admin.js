import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect, useState }  from 'react';
import {Navbar, Nav, ProgressBar} from 'react-bootstrap';
import './index.css'; 

const adminDashboard = () =>{



  const [questionIn, questionData] = useState({
    question : '',
    option1 : '',
    option2 : '',
    option3 : '',
    option4 : '',
    option5 : ''
});
// const [AnswerIn, answerData] = useState({
//     question : '',
//     answer1 : '',
//     answer2 : '',
//     answer3 : '',
//     answer4 : '',
//     answer5 : ''
// })

const handleChange = (e) => {
    const{id, value} = e.target;

    if(id.startsWith('option')){
        questionData(prevData => ({
            ...prevData,
            [id]: value
        }))
    // } else {
    //     answerData(prevData => ({
    //         ...prevData,
    //         [id] : value
    //     }))
    // }

    }

}

const [correctAnswer, setCorrectAnswers]
const [explanation, setExplanation]

const onCorrectAnswer = (e) => {
    setCorrectAnswers(e.target.value)
}

const onExplanation = (e) => {
    setExplanation(e.target.value)
}

const handleSubmit = (e) => {
    e.preventDefault();
}

//COLLECT DATA
const setQuestionData = {
    ...questionIn,
    correctAnswer,
    explanation

}

console.log("Submitted Question Data: ", setQuestionData);

 // Reset the form after submission
 setQuestionData({
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    option5: '',
  });
  setCorrectAnswers('');
  setExplanation('');

  return(
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
      <div className="mb-3">
        <label htmlFor="option1" className="form-label">Option 1</label>
        <input
          type="text"
          className="form-control"
          id="option1"
          value={questionIn.option1}
          onChange={handleChange}
          placeholder="Enter option 1"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="option2" className="form-label">Option 2</label>
        <input
          type="text"
          className="form-control"
          id="option2"
          value={questionIn.option2}
          onChange={handleChange}
          placeholder="Enter option 2"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="option3" className="form-label">Option 3</label>
        <input
          type="text"
          className="form-control"
          id="option3"
          value={questionIn.option3}
          onChange={handleChange}
          placeholder="Enter option 3"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="option4" className="form-label">Option 4</label>
        <input
          type="text"
          className="form-control"
          id="option4"
          value={questionIn.option4}
          onChange={handleChange}
          placeholder="Enter option 4"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="option5" className="form-label">Option 5</label>
        <input
          type="text"
          className="form-control"
          id="option5"
          value={questionIn.option5}
          onChange={handleChange}
          placeholder="Enter option 5"
        />
      </div>

      {/* Correct Answer Selection */}
      <div className="mb-3">
        <label htmlFor="correctAnswer" className="form-label">Select the Correct Answer</label>
        <select
          className="form-control"
          id="correctAnswer"
          value={correctAnswer}
          onChange={onCorrectAnswer}
        >
          <option value="" disabled>Select correct answer</option>
          <option value={questionIn.option1}>{questionIn.option1}</option>
          <option value={questionIn.option2}>{questionIn.option2}</option>
          <option value={questionIn.option3}>{questionIn.option3}</option>
          <option value={questionIn.option4}>{questionIn.option4}</option>
          <option value={questionIn.option5}>{questionIn.option5}</option>
        </select>
      </div>

      {/* Explanation Input */}
      <div className="mb-3">
        <label htmlFor="explanation" className="form-label">Explanation for the Correct Answer</label>
        <textarea
          className="form-control"
          id="explanation"
          value={explanation}
          onChange={onExplanation}
          rows="3"
          placeholder="Provide a detailed explanation of why this answer is correct"
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary">Submit</button>

    </form>
  </div>
);


  
};




export default adminDashboard