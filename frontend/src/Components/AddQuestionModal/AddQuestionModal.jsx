import "./addQuestionModal.css"

export default function AddQuestionModal ({user, toggleModal}) {
  
  async function handleSubmit (event) {
    event.preventDefault();
    const questionData = new FormData(event.target)
    const question = {
      question: questionData.get('question'),
      answers: {
        answerA: questionData.get('answerA'),
        answerB: questionData.get('answerB'),
        answerC: questionData.get('answerC'),
        answerD: questionData.get('answerD'),
      },
      user: user['_id'],
      correctAnswer: questionData.get('correctAnswer'),
      difficulty: questionData.get('difficulty'),
    }
    await fetch('/api/questions/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(question)
    });
  }

  function handleClose (event){
    if(event.target.id === 'overlay'){
      toggleModal(false);
    }
  }

  return (
     <div className="add-modal-overlay" id="overlay" onClick={handleClose}>
        <div className='add-modal-container'>
          <div className='add-modal-content'>
            <form onSubmit={handleSubmit} action="submit">
            <div>
              <label className="add-question-label"> Type your question here:
                <textarea name='question' type="text" />
              </label>
            </div>
              <div className='answer-inputs'>
              <div>
                <label className="answer-a"> Answer A:
                  <input name='answerA' type="text" />
                </label> 
              </div>
              <div>
                <label className="answer-b"> Answer B:
                  <input name='answerB' type="text" />
                </label>
              </div>
              <div>
                <label className="answer-c"> Answer C:
                  <input name='answerC' type="text" />
                </label>
              </div>
              <div>
                <label className="answer-d"> Answer D:
                  <input name='answerD' type="text" />
                </label>
              </div>
              </div>
              <div>
              <label>Select the correct answer for your question:
                <select name="correctAnswer">
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </label>
              </div>
              <div>
              <label>Select the right difficulty of your question:
                <select name="difficulty">
                  <option value="1">Easy</option>
                  <option value="2">Medium</option>
                  <option value="3">Hard</option>
                </select>
              </label>
              </div>
              <button type="submit">Add question</button>
            </form>
          </div>
        </div>
      </div>

  )
}