import React, { useState, useEffect } from "react";

const QuestionCard = ({ questionData, currentIndex, onNext, updateScore }) => {
  const { question, options, answer } = questionData;
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(false);
  const [timer, setTimer] = useState(60);

  // Timer logic
  useEffect(() => {
    let intervalId = null;

    const startTimer = () => {
      intervalId = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(intervalId);
            onNext(); // Automatically go to the next question
            updateScore(0); // Decrement score for skipping
            return 60; // Reset the timer for the next question
          }
          return prev - 1; // Decrease the timer by 1 second
        });
      }, 1000);
    };

    startTimer();

    return () => {
      clearInterval(intervalId);
    };
  }, [onNext, updateScore, currentIndex]);

  // Handle answer selection
  const handleAnswer = (option) => {
    setSelected(option);
    setFeedback(true);
    if (option === answer) {
      updateScore(1); // Increment score for correct answer
    }
  };

  // Reset state when new question is loaded
  useEffect(() => {
    setTimer(60);
    setSelected(null);
    setFeedback(false);
  }, [currentIndex]);

  return (
    <div className="question-card">
      <h2>
        Question {currentIndex + 1}: {question}
      </h2>

      {/* Visual Timer */}
      <div className="timer-container">
        <div
          className="timer-bar"
          style={{
            width: `${(timer / 60) * 100}%`, // Calculate width as percentage
            backgroundColor: timer > 20 ? "#4caf50" : timer > 10 ? "#ff9800" : "#f44336", // Change color based on remaining time
          }}
        ></div>
      </div>
      <p>Time left: {timer}s</p>

      <div className="options">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            style={{
              backgroundColor:
                feedback && option === answer
                  ? "green"
                  : feedback && option === selected
                  ? "red"
                  : "",
            }}
            disabled={feedback} // Disable buttons after selection
          >
            {option}
          </button>
        ))}
      </div>

      {feedback && (
        <button onClick={onNext} className="next-button">
          Next Question
        </button>
      )}
    </div>
  );
};

export default QuestionCard;