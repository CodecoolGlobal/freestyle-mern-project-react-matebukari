import { useState } from "react";
import UpdateQuestion from "../../Components/MyQuestionsTable/UpdateQuestion";


export default function MyQuestionsTable ({questions, onModifyQuestion, onUpdate}) {
  const [toggleModal, setToggleModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  function handleUpdateClick (selectedQuestion){
    setSelectedQuestion(selectedQuestion)
    setToggleModal(true);
  }
  function handleDeleteClick (selectedQuestion){
    const newQuestions = questions.filter((question) => question._id !== selectedQuestion._id);
    onModifyQuestion(newQuestions);
    fetch(`/api/question/${selectedQuestion._id}`, {
      method: "DELETE"
    });
  }


  return (
    <>
    {toggleModal && <UpdateQuestion onToggleModal={setToggleModal} selectedQuestion={selectedQuestion} onUpdate={onUpdate}/>}
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
                  <button onClick={() => handleUpdateClick(question)}>UPDATE</button>
                  <button onClick={() => handleDeleteClick(question)}>DELETE</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <h1>No questions found!</h1>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </>
  );
}
