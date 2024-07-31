export default function GameQuestion ({questions, progress}) {
  console.log(questions[progress]);

  return (
    <div className='question-container'>
      <div className="question">{questions[progress].question}</div>
    </div>
  )
}