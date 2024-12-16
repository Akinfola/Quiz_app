import React, { useState } from "react";
import StartScreen from "./components/StarScreen";
import QuestionCard from "./components/QuestionCard";
import Results from "./components/Results";
import quizData from "./quizData";

const App = () => {
  const [stage, setStage] = useState("start"); // "start", "quiz", or "results"
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);

  const startQuiz = () => {
    setStage("quiz");
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStage("results");
    }
  };

  const updateScore = (points) => {
    setScore((prev) => prev + points);
  };

  const saveAnswer = (answer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = answer;
    setUserAnswers(updatedAnswers);
  };

  return (
    <div className="App">
      {stage === "start" && <StartScreen startQuiz={startQuiz} />}
      {stage === "quiz" && (
        <QuestionCard
          questionData={quizData[currentQuestion]}
          currentIndex={currentQuestion}
          onNext={handleNext}
          updateScore={(points) => {
            updateScore(points);
            saveAnswer(points === 1 ? quizData[currentQuestion].answer : null);
          }}
        />
      )}
      {stage === "results" && (
        <Results
          score={score}
          questions={quizData}
          userAnswers={userAnswers}
        />
      )}
    </div>
  );
};

export default App;