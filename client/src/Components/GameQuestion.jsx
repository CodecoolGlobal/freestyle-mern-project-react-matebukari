export default function GameQuestion ({questions, progress}) {
  console.log(questions[progress]);

  return (
    <div className='question-container'>
      {<h1 className='question'>{questions[progress].question}</h1>}
    </div>
  )
}