export default function MyQuestionsTable ({questions}) {


  function handleUpdateClick (){
    
  }
  function handleDeleteClick (){

  }


  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Question</th>
            <th>A</th>
            <th>B</th>
            <th>C</th>
            <th>D</th>
            <th>Correct Answer</th>
            <th>Difficulty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.length > 0 ? (
            questions.map((question) => (
              <tr key={question._id}>
                <td>{question.question}</td>
                <td>{question.answers.answerA}</td>
                <td>{question.answers.answerB}</td>
                <td>{question.answers.answerC}</td>
                <td>{question.answers.answerD}</td>
                <td>{question.correctAnswer}</td>
                <td>{question.difficulty}</td>
                <td>
                  <button onClick={handleUpdateClick}>UPDATE</button>
                  <button onClick={handleDeleteClick}>DELETE</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <h1>Loading...</h1>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
