import "./updateQuestion.css"

export default function AddQuestionModal ({onToggleModal, selectedQuestion, onUpdate}) {
  
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
      user: selectedQuestion.user._id,
      correctAnswer: questionData.get('correctAnswer'),
      difficulty: Number(questionData.get('difficulty')),
    }
    console.log(question);
    console.log(selectedQuestion.user);
      await fetch(`/api/question/${selectedQuestion._id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(question)
    });
    onUpdate((prev) => !prev)
    onToggleModal(false);
  }

  function handleClose (event){
    if(event.target.id === 'overlay'){
      onToggleModal(false);
    }
  }

  return (
     <div className="update-modal-overlay" id="overlay" onClick={handleClose}>
        <div className='update-modal-container'>
          <div className='update-modal-content'>
            <form onSubmit={handleSubmit} action="submit">
            <div>
              <label className="add-question-label"> Type your question here:
                <textarea defaultValue={selectedQuestion.question} name='question' type="text" />
              </label>
            </div>
              <div className='answer-inputs'>
              <div>
                <label className="answer-a"> Answer A:
                  <input defaultValue={selectedQuestion.answers.answerA} name='answerA' type="text" />
                </label> 
              </div>
              <div>
                <label className="answer-b"> Answer B:
                  <input defaultValue={selectedQuestion.answers.answerB} name='answerB' type="text" />
                </label>
              </div>
              <div>
                <label className="answer-c"> Answer C:
                  <input defaultValue={selectedQuestion.answers.answerC} name='answerC' type="text" />
                </label>
              </div>
              <div>
                <label className="answer-d"> Answer D:
                  <input defaultValue={selectedQuestion.answers.answerD} name='answerD' type="text" />
                </label>
              </div>
              </div>
              <div>
              <label>Select the correct answer for your question:
                <select defaultValue={selectedQuestion.correctAnswer} name="correctAnswer">
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
              </label>
              </div>
              <div>
              <label>Select the right difficulty of your question:
                <select defaultValue={selectedQuestion.difficulty} name="difficulty">
                  <option value="1">Easy</option>
                  <option value="2">Medium</option>
                  <option value="3">Hard</option>
                </select>
              </label>
              </div>
              <button type="submit">Update question</button>
            </form>
          </div>
        </div>
      </div>

  )
}