import { useEffect, useState } from "react";
import "../Pages/styles/allQuestionsModal.css"

async function fetchQuestions() {
  const response = await fetch('/api/questions-all');
  const result = await response.json();
  return result;
}

export default function AllQuestionsModal ({ toggleModal }) {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function getQuestions () {
      const questions = await fetchQuestions();
      setQuestions(questions);
    }
    getQuestions();
  }, [])

  function handleClose (event) {
    if(event.target.id === 'overlay'){
      toggleModal(false);
    }
  }
  
  return (
    <div className="modal-overlay" id="overlay" onClick={handleClose}>
      <div className='modal-container'>
        <div className='modal-content'>
        {questions.length > 0 ? (
              questions.map((question, i) => (
                <div className="user-content" key={`question-${i}`}><strong>Posted by: </strong>{question.user.name }
                  <div className="user-question"><strong>Question: </strong>{question.question }</div>
                  <div><strong>Difficulty: </strong>Lvl-{question.difficulty}</div>
                  <div className="user-answer"><strong>Answers: </strong>
                    <div>Answer A: {question.answers.answerA}</div>
                    <div>Answer B: {question.answers.answerB}</div>
                    <div>Answer C: {question.answers.answerC}</div>
                    <div>Answer D: {question.answers.answerD}</div>
                  </div>

                </div>
              ))
        ) : <div>Loading...</div> }
        </div>
      </div>
    </div>
  )
}