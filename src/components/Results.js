import React from 'react';

const Results = ({ timeElapsed, userInput, randomText, onReset }) => {
    const calculateWPM = () => {
      const wordsTyped = userInput.trim().split(' ').length;
      const minutes = timeElapsed / 60;
      return Math.round(wordsTyped / minutes); // Words per minute
    };
  
    const calculateAccuracy = () => {
      const correctChars = randomText.split('').filter((char, idx) => char === userInput[idx]).length;
      return Math.round((correctChars / randomText.length) * 100); // Accuracy percentage
    };
  
    return (
      <div className="results">
        <p>Time Elapsed: {timeElapsed.toFixed(2)} seconds</p>
        <p>Words Per Minute (WPM): {calculateWPM()}</p>
        <p>Accuracy: {calculateAccuracy()}%</p>
        <button onClick={onReset}>Reset Test</button>
      </div>
    );
  };
  

export default Results;
