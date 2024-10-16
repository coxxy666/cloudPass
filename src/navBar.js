import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React, { useEffect, useState }  from 'react';
import {Navbar, Nav, ProgressBar} from 'react-bootstrap';
import './index.css'; 
import adminDashboard from ./private/admin.js
const questions = [
    {
        question: 'How would a system administrator add an additional layer of login security to a user\'s AWS Management Console?',
        options: ['A. Use Amazon Cloud Directory', 'B. Audit AWS Identity and Access Management (IAM) roles', 'C. Enable multi-factor authentication', 'D. Enable AWS CloudTrail'],
        correctAnswer: 'C. Enable multi-factor authentication',
        explanation: {
            'A': 'Cloud Directory is not related to login security.',
            'B': 'Auditing IAM roles does not add an extra security layer.',
            'C': 'Multi-factor authentication adds an extra layer of security.',
            'D': 'CloudTrail is for logging actions, not securing login.'
        }
    },
    {
        question: 'Which service can identify the user that made the API call when an Amazon EC2 instance is terminated?',
        options: ['AWS Trusted Advisor', 'AWS CloudTrail', 'AWS X-Ray', 'AWS Identity and Access Management (AWS IAM)'],
        correctAnswer: 'B. AWS CloudTrail',
        explanation: {
            'A': 'Trusted Advisor is for best practices, not user identification.',
            'B': 'CloudTrail tracks user actions, including API calls.',
            'C': 'X-Ray is for debugging, not tracking user actions.',
            'D': 'IAM controls permissions, not user activity logging.'
        }
    }
];


const Nav_bar = () => {
    return(
        <Navbar expand='lg'>
            <Navbar.Brand>Ezeiyoke Cosmas</Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse>

                <Nav className='me-auto nav_nav'>
                    <Nav.Link className='nav_text' href='#'>Home</Nav.Link>
                    <Nav.Link className='nav_text' href='/private/admin.js'>Instuctions</Nav.Link>

                </Nav>
            </Navbar.Collapse>
            </Navbar>
        
    );
}


const Bodycontent = () => {

    // const [isdisplay,displayNow] = useState(false)

    // const HandleDisplay = () => {
    //     displayNow(true)
    // }

  const [currentQuestion, setCurrentQuestion] = useState(0); 
  const [selectedAnswer, setSelectedAnswer] = useState(''); 
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(80 * 60);
  const [progress, setProgress] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const handleOptionChange = (e) => {
  setSelectedAnswer(e.target.value);
  setIsFlipped(false); 
  };
  
  const handleSubmit = () => {
    if (selectedAnswer) {
      setIsFlipped(true); 
      
      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        // setCorrectAnswers(prevCorrect => prevCorrect + 1) 
        // setTotalScore(prevScore => prevScore + 1);
        
        // setProgress(((prevCorrect + 1) / questions.length) * 100);
        // console.log(correctAnswers)

        setCorrectAnswers(prevCorrect => {
            const updatedCorrect = prevCorrect + 1;
            
            // Update progress based on correct answers
            setProgress((updatedCorrect / questions.length) * 100);
            setTotalScore(prevScore => prevScore + 1)
            return updatedCorrect;
    })
      }
    } 
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1); 
      setSelectedAnswer(''); 
      setIsFlipped(false);

    //   setProgress(((currentQuestion + 2) / questions.length) * 100);
    } else {
        
        alert(`You've completed the quiz! Your total score is ${totalScore}/${questions.length}`);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      // You can reset the selected answer and flip animation as needed, just like for 'Next'
      setSelectedAnswer(true); 
       setIsFlipped(true);
    } else {
      alert("You are on the first question.");
    }
  };

  useEffect(() => {
    const countDown = setInterval(() => {
        setTimeRemaining(prevTime => {
            if(prevTime <= 0) {
                clearInterval((countDown))
                return 0
            }
            return prevTime -1
        })
    }, 1000 )

  }, [])

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };


  const calProgress = (correctAnswers / questions.length) * 100;

    return(
        <div>
            {!isFlipped &&  (
        <div className='container question-cont'>''
            <div className='row mb-4 question-row'>
                <div className='col-lg-6 timer'>
                    <div className='total-time'><h6>Total Time</h6></div>
                    <h3 style={{textAlign : 'center'}}>{formatTime(timeRemaining)}</h3>
                    <ProgressBar 
                            now={calProgress} 
                            label={`${Math.round(calProgress)}%`} 
                            style={{ backgroundColor: calProgress > 0 ? 'green' : 'yellow' }}
                            className='progress-rule'
                        />
                    
                </div>
            
               
            <div className='row mb-2'>
              <div className='col-lg-6 question'>
              <h5 className="score">{currentQuestion + 1}/65</h5>
              <h6>{questions[currentQuestion].question}</h6>
                <div className='option'>
                <ul className="option-list">
                {questions[currentQuestion].options.map((option, index) => (
                  <li className="options1" key={index}>
                    <label>
                      <input 
                        type="radio" 
                        name="option" 
                        value={option}
                        onChange={handleOptionChange}
                        checked={selectedAnswer === option}
                      /> {option}
                    </label>
                  </li>
                ))}
              </ul>
                </div>
                <div className='col-lg-12 move-button'>
                <button className='btn-block submit-block' onClick={handleSubmit}>submit</button>
              
                </div> 
            </div>
            </div>
                
            </div>

        </div>
        )}

        {isFlipped && (
        <div className='container answer-cont'>
          <div className='row mb-4 answer-row'>
            <div className='row mb-2'>
              <div className='col-lg-6 answer'>
                <h6>{questions[currentQuestion].question}</h6>
                <h6 style={{ color: 'black' }}>The correct answer is: {questions[currentQuestion].correctAnswer}</h6>
                <div className="answer-list">
                  <ul>
                    {Object.entries(questions[currentQuestion].explanation).map(
                      ([option, explanation], index) => (
                        <li key={index}>
                          <strong>{option}:</strong> {explanation}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    

         
                      
                <div className='col-lg-12 move-button'>
                <button className='btn-block prev-block'onClick={handlePrev } >PREV</button>
                <button className='btn-block next-block' onClick={handleNext}>NEXT</button>
                </div> 
            </div>

    );
}


function App() {
    return(

        <div className='app'>

            <Nav_bar />
            <Bodycontent/>
            <adminDashboard />

        </div>

    )


}

export default App