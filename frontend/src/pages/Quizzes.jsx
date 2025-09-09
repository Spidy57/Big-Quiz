import React, { useState } from "react";
import "./Quizzes.css";



const Quizzes = () => {
  const [showModal, setShowModal] = useState(true);
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState(""); // stores selected letter
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTopicSubmit = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);
    setError("");
    try {
      // Call backend to get quiz questions for topic
  const res = await fetch("http://localhost:5000/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      console.log("Quiz API response:", data); // Debug log
      let quizData = Array.isArray(data) ? data : [];
      if (quizData.length) {
        setQuestions(quizData);
        setShowModal(false);
      } else {
        setError("No questions found. Try another topic.");
      }
    } catch (err) {
      setError("Error fetching questions.");
      console.error("Quiz fetch error:", err);
    }
    setLoading(false);
  };

  const handleAnswer = () => {
    if (!userAnswer) return;
    // Compare selected letter to correct answer letter
    if (userAnswer === questions[current].answer) {
      setScore(score + 1);
    }
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setUserAnswer("");
    } else {
      setFinished(true);
    }
  };

  const restartQuiz = () => {
    setShowModal(true);
    setTopic("");
    setQuestions([]);
    setCurrent(0);
    setScore(0);
    setUserAnswer("");
    setFinished(false);
    setError("");
  };

  return (
    <div className="quizzes-container">
      <h1>Quiz Game</h1>
      {showModal && (
        <div className="modal-bg">
          <div className="modal">
            <h2>Choose a Topic</h2>
            <form onSubmit={handleTopicSubmit}>
              <input
                type="text"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder="Enter topic (e.g. Science)"
                disabled={loading}
              />
              <button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Start Quiz"}
              </button>
            </form>
            {error && <div className="error">{error}</div>}
          </div>
        </div>
      )}
      {!showModal && !finished && questions.length > 0 && (
        <div className="quiz-box">
          <div className="score">Points: {score}</div>
          <div className="question">
            <h3>{questions[current].question}</h3>
            <div className="options">
              {questions[current].options.map((opt, idx) => {
                // Extract letter (A, B, C, D) from option string
                const letter = opt.trim().charAt(0);
                return (
                  <label key={idx} className="option-label">
                    <input
                      type="radio"
                      name="option"
                      value={letter}
                      checked={userAnswer === letter}
                      onChange={() => setUserAnswer(letter)}
                    />
                    {opt}
                  </label>
                );
              })}
            </div>
            <button className="next-btn" onClick={handleAnswer} disabled={!userAnswer}>
              {current + 1 === questions.length ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      )}
      {finished && (
        <div className="result-box">
          <h2>Quiz Finished!</h2>
          <p>Your Score: {score} / {questions.length}</p>
          <button onClick={restartQuiz}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default Quizzes;
