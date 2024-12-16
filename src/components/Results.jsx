import React from "react";

const Results = ({ score, questions, userAnswers }) => {
  return (
    <div className="results">
      <h1>Quiz Complete!</h1>
      <h2>Your Final Score: {score}</h2>
      <h3>Review Your Answers:</h3>
      <ul>
        {questions.map((q, index) => (
          <li key={q.id}>
            <p>Question: {q.question}</p>
            <p>Your Answer: {userAnswers[index] || "Skipped"}</p>
            <p>Correct Answer: {q.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Results;