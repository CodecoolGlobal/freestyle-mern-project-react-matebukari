export default function AddQuestionModal ({user}) {
  
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
    console.log(user);
    console.log(question);
    const response = await fetch('/api/question', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(question)
    });
    const result = await response.json();
    console.log(result);
  }

  return (
      <div className='modal'>
        <form onSubmit={handleSubmit} action="submit">
          <label> Type your question here:
            <textarea name='question' type="text" />
          </label>
          <div className='answer-inputs'>
            <label> Answer A:
              <input name='answerA' type="text" />
            </label>
            <label> Answer B:
              <input name='answerB' type="text" />
            </label>
            <label> Answer C:
              <input name='answerC' type="text" />
            </label>
            <label> Answer D:
              <input name='answerD' type="text" />
            </label>
          </div>
          <label>Select the correct answer for your question:
            <select name="correctAnswer">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </label>
          <label>Select the right difficulty of your question:
            <select name="difficulty">
              <option value="1">Easy</option>
              <option value="2">Medium</option>
              <option value="3">Hard</option>
            </select>
          </label>
          <button type="submit">Add question</button>
        </form>
      </div>
  )
}