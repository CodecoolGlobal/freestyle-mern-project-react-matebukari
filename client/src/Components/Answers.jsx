export default function Answers ({answers, progress, correctAnswer, onProgress}){
  console.log(answers);
  function handleAnswer(event){
    if (event.target.id === correctAnswer) {
      console.log('Corrtect answer');
      onProgress((prev) => prev + 1);
    } else {
      console.log('worng answer');
    }
  }

  return (
    <div className="answers-container">
      <div className="answers-content">
        <div className="answerA" id='A' onClick={handleAnswer}>A: {answers.answerA}</div>
        <div className="answerB" id='B' onClick={handleAnswer}>B: {answers.answerB}</div>
        <br></br>
        <div className="answerC" id='C' onClick={handleAnswer}>C: {answers.answerC}</div>
        <div className="answerD" id='D' onClick={handleAnswer}>D: {answers.answerD}</div>
      </div>
    </div>
  )
}