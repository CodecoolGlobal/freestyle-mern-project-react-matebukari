import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddQuestionModal from "../Components/AddQuestionModal";
import GameQuestion from "../Components/GameQuestion";
import Answers from "../Components/Answers";
import WinModal from "../Components/WinModal";
import LosingModal from "../Components/LosingModal";
import ProgressList from "../Components/ProgressList";

export default function GamePage() {
  const location = useLocation();
  const userData = location.state;
  const [gameStart, setGameStart] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [questions, setQuestions] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isWon, setIsWon] = useState(false)
  const [isLost, setIsLost] = useState(false)
  const [score, setScore] = useState(0)
  const [prices, setPrices] = useState([]);

  function handleSaveScore(){
    if ((progress + 1) % 3 === 0){
      setScore(prices[progress])
    }
  } 

  useEffect((score)=> {
    handleSaveScore()

  }, [isWon, isLost])


  function onReset(){
    setGameStart(false)
    setIsLost(false)
    setProgress(0)
    setIsWon(false)
  }


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
    <div className="game-root">
      <nav className="nav-bar">
      <button onClick={handleAddQuestion}>Add question</button>
      <div>{userData.name}
      {/* <img src="./d*ckpic.jpg" alt="d*ckpic" /> */}
      </div>
      </nav>
    {!gameStart && <>
      <button onClick={handleGameStart}>Start</button>
      {showQuestionModal && <AddQuestionModal user={userData}/>}
    </>}
    {gameStart && 
    <>
      {questions && <ProgressList maxQuestions={questions.length} prices={prices} onPriceSet={setPrices}/>}
      {questions && <GameQuestion questions={questions} progress={progress}/>}
      {questions && <Answers 
        answers={questions[progress].answers} 
        progress={progress} 
        onProgress={setProgress} 
        onWinning={setIsWon}
        onLosing={setIsLost}
        maxQuestions={questions.length}
        correctAnswer={questions[progress].correctAnswer}/>}
      {/* <button onClick={() => setProgress((prev) => prev - 1)}>Prev</button>
      <button onClick={() => setProgress((prev) => prev + 1)}>Next</button> */}
      {isWon && <WinModal onReset={onReset} score={score}/>}
      {isLost && <LosingModal onReset={onReset}/>}

    </>
    }
    </div>

  );
}
