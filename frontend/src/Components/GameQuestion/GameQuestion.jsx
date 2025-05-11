import "./gameQuestion.css"

export default function GameQuestion ({questions, progress}) {
  return (
    <div className='question-container'>
      <div className="question">{questions[progress].question}</div>
    </div>
  )
}