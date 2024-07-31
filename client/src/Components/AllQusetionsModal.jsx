import { useEffect, useState } from "react";
import "../Pages/styles/leaderBoardModal.css"

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
                <div>{question.question}</div>
              ))
        ) : <div>Loading...</div> }
        </div>
      </div>
    </div>
  )
}