function getRandomQuestion () {
  fetch('/api/question')
}

export default function GameQuestion () {


  return (
    <div class='question-container'>
      <h1 class='question'>`${}`</h1>
    </div>
  )
}