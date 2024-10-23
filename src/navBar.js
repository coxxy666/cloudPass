import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap import
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // react-router imports
import React, { useEffect, useState } from 'react'; // React imports
import { Navbar, Nav, ProgressBar } from 'react-bootstrap'; // Bootstrap components
import './index.css'; // Your custom styles
import AdminDashboard from './private/admin.js'; // Import the admin component

const Nav_bar = () => {
  return (
    <Navbar expand='lg'>
      <Navbar.Brand>Ezeiyoke Cosmas</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className='me-auto nav_nav'>
          <Nav.Link className='nav_text' href='#'>Home</Nav.Link>
          <Nav.Link as={Link} to="/admin" className='nav_text'>Instructions</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const Bodycontent = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(80 * 60);
  const [totalScore, setTotalScore] = useState(0);
  const MAX_QUESTIONS = 65;

  const shuffleArray = (array) => {
    for (let i = array.length -1 ; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  useEffect(() => {
    // Fetch questions from the backend
    fetch('http://localhost:3001/questions') // Replace with your actual backend API URL
      .then(response => response.json())
      // .then(data => setQuestions(data)) // Assume the data is an array of questions
      .then(data => {
        // Shuffle the questions and limit them to MAX_QUESTIONS
        const shuffledQuestions = shuffleArray(data);
        const limitedQuestions = shuffledQuestions.slice(0, MAX_QUESTIONS);
        setQuestions(limitedQuestions);
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const handleOptionChange = (e) => {
    setSelectedAnswer(e.target.value);
    setIsFlipped(false);
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      setIsFlipped(true);

      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setCorrectAnswers((prevCorrect) => {
          const updatedCorrect = prevCorrect + 1;
          // console.log("Correct answers: ", updatedCorrect);
          // setTotalScore((prevScore) => prevScore + 1);
          // console.log("totlascore: ", updatedCorrect);
          return updatedCorrect;
        });
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
      setIsFlipped(false);
    } else {
      alert(`You've completed the quiz! Your total score is ${correctAnswers}/${questions.length}`);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(true);
      setIsFlipped(true);
    } else {
      alert("You are on the first question.");
    }
  };

  useEffect(() => {
    const countDown = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(countDown);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(countDown); // Cleanup
  }, []);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const calProgress = (correctAnswers / questions.length) * 100;

  return (
    <div>
      {!isFlipped && questions.length > 0 && (
        <div className='container question-cont'>
          <div className='row mb-4 question-row'>
            <div className='col-lg-6 timer'>
              <div className='total-time'><h6>Total Time</h6></div>
              <h3 style={{ textAlign: 'center' }}>{formatTime(timeRemaining)}</h3>
              <ProgressBar
                now={calProgress}
                label={`${Math.round(calProgress)}%`}
                style={{ backgroundColor: calProgress > 0 ? 'green' : 'yellow' }}
                className='progress-rule'
              />
            </div>

            <div className='row mb-2'>
              <div className='col-lg-6 question'>
                <h5 className="score">{currentQuestion + 1}/{questions.length}</h5>
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
                  <button className='btn-block submit-block' onClick={handleSubmit}>Submit</button>
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
        <button className='btn-block prev-block' onClick={handlePrev}>PREV</button>
        <button className='btn-block next-block' onClick={handleNext}>NEXT</button>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className='app'>
        <Nav_bar />
        <Routes>
          <Route path="/" element={<Bodycontent />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
