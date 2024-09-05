import React, { useState, useEffect } from 'react';
import './App.css';
import RandomTextDisplay from './components/RandomTextDisplay';
import TypingInput from './components/TypingInput';
import Results from './components/Results';

const App = () => {
  const [randomText, setRandomText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Fetch random text from the API
  useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/posts/1')
    .then((response) => response.json())
    .then((data) => setRandomText(data.body)); // Display the 'body' of the fetched post
}, []);

  
  

  // Update time elapsed every second if the test is in progress
  useEffect(() => {
    let interval;
    if (startTime && !isFinished) {
      interval = setInterval(() => {
        setTimeElapsed((new Date() - startTime) / 1000); // Time in seconds
      }, 1000);
    }
    return () => clearInterval(interval); // Cleanup interval
  }, [startTime, isFinished]);

  // Handle user input and start timer
  const handleInputChange = (input) => {
    if (!startTime) {
      setStartTime(new Date());  // Start timer
    }
    setUserInput(input);

    if (input === randomText) {
      const endTime = new Date();
      setTimeElapsed((endTime - startTime) / 1000);  // Time in seconds
      setIsFinished(true);
    }
  };

  // Calculate Accuracy in Real Time
  const calculateAccuracy = () => {
    const correctChars = randomText.split('').filter((char, idx) => char === userInput[idx]).length;
    return Math.round((correctChars / randomText.length) * 100); // Accuracy percentage
  };

  const resetTest = () => {
    setUserInput('');
    setStartTime(null);
    setTimeElapsed(0);
    setIsFinished(false);
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => setRandomText(data.content));
  };

  const handleSubmit = () => {
    setIsFinished(true);
  };

  return (
    <div className="container">
      <h1>Typing Speed Test</h1>
      <RandomTextDisplay text={randomText} />
      <div className="timer">
        <p>Time Elapsed: {timeElapsed.toFixed(2)} seconds</p>
      </div>
      {!isFinished ? (
        <>
          <TypingInput value={userInput} onChange={handleInputChange} />
          <div className="accuracy">
            <p>Accuracy: {calculateAccuracy()}%</p>
          </div>
          <button className="submit-button" onClick={handleSubmit}>Submit</button>
        </>
      ) : (
        <Results timeElapsed={timeElapsed} userInput={userInput} randomText={randomText} onReset={resetTest} />
      )}
    </div>
  );
};

export default App;
