import { useState } from "react";
import { useLocation } from "react-router-dom";
import AddQuestionModal from "../Components/AddQuestionModal";

export default function GamePage() {
  const location = useLocation();
  const userData = location.state;
  const [gameStart, setGameStart] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false)

  function handleGameStart() {
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
    <></>
    }
    </div>

  );
}
