import { useEffect, useState } from "react";
import './Quizzes.css';

function Quizzes() {
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  fetch("http://localhost:5000/api/quiz")
    .then((res) => res.json())
    .then((data) => {
      console.log("Quiz Data:", data); // debug
      setQuiz(Array.isArray(data) ? data : data.raw ? [] : []);
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      setError("Failed to load quiz");
      setLoading(false);
    });
    }, []);


  if (loading) return <h2>Loading quiz...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
  <div className="quiz-page">
    <h1>Quiz</h1>
    {quiz.length > 0 ? (
      quiz.map((q, i) => (
        <div key={i} className="question-block">
          <h3>{q.question}</h3>
          <ul>
            {q.options && q.options.length > 0 ? (
              q.options.map((opt, idx) => <li key={idx}>{opt}</li>)
            ) : (
              <li>No options available</li>
            )}
          </ul>
          <p><strong>Answer:</strong> {q.answer}</p>
        </div>
      ))
    ) : (
      <pre>{JSON.stringify(quiz, null, 2)}</pre>
    )}
  </div>
    );

}

export default Quizzes;
