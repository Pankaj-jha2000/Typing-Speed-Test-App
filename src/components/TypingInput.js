import React from 'react';

const TypingInput = ({ value, onChange }) => {
    const handleInput = (e) => {
      onChange(e.target.value);  // Triggering the change in App.js
    };
  
    return (
      <textarea
        className="typing-input"
        placeholder="Start typing..."
        value={value}
        onChange={handleInput}
      />
    );
  };
  

export default TypingInput;
