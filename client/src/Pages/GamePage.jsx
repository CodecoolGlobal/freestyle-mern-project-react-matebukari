import { useState } from "react";
import { useLocation } from "react-router-dom";
import AddQuestionModal from "../Components/AddQuestionModal";
import GameQuestion from "../Components/GameQuestion";

export default function GamePage() {
  const location = useLocation();
  const userData = location.state;
  const [gameStart, setGameStart] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [questions, setQuestions] = useState(null);
  const [progress, setProgress] = useState(0);

  async function handleGameStart() {
    const response = await fetch('/api/questions-ingame');
    const result = await response.json();
    setQuestions(result.questions);
    console.log(result);
    setGameStart(true);
  }

  function handleAddQuestion () {
    setShowQuestionModal(true);
  }

  return (
    <div>
    {!gameStart && <>
      <button onClick={handleGameStart}>Start</button>
      <button onClick={handleAddQuestion}>Add question</button>
      {showQuestionModal && <AddQuestionModal user={userData}/>}
    </>}
    {gameStart && 
    <>
    {questions && <GameQuestion questions={questions} progress={progress}/>}
    <button onClick={() => setProgress((prev) => prev - 1)}>Prev</button>
    <button onClick={() => setProgress((prev) => prev + 1)}>Next</button>
    </>
    }
    </div>

  );
}
