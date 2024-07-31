import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddQuestionModal from "../Components/AddQuestionModal";
import GameQuestion from "../Components/GameQuestion";
import Answers from "../Components/Answers";
import WinModal from "../Components/WinModal";
import LosingModal from "../Components/LosingModal";
import ProgressList from "../Components/ProgressList";
import "./styles/gamePage.css";
import LeaderBoardModal from "../Components/LeaderBoardModal";
import AllQuestionsModal from "../Components/AllQusetionsModal";

const updateUser = (user) => {
  return fetch(`/api/user/${user._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

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
  const [showLeaderBoard, setShowLeaderBoard] = useState(false);
  const [showAllquestion, setshowAllquestion] = useState(false);


  function handleSaveScore(){
    if ((progress + 1) % 3 === 0){
      setScore(prices[progress])
    }
  } 

  useEffect(()=> {
    handleSaveScore()

  }, [isWon, isLost])


  function onLoseReset(){
    setGameStart(false);
    setIsLost(false);
    setProgress(0);
    setIsWon(false);
  }

  const newUser = {
    ...userData,
    score
  }

  function onWinReset () {
    setGameStart(false);
    setIsLost(false);
    setProgress(0);
    setIsWon(false);
    updateUser(newUser);
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

  function handleShowLeaderBoard () {
    setShowLeaderBoard(true);
  }

  function handleShowQuestions () {
    setshowAllquestion(true);
  }

  return (
    <div className="game-root">
      <nav className="nav-bar">
      <button onClick={handleAddQuestion}>Add questions</button>
      <button onClick={handleShowLeaderBoard}>Leader Booard</button>
      <button onClick={handleShowQuestions}>All questions</button>
      <div>{userData.name}
      {/* <img src="./d*ckpic.jpg" alt="d*ckpic" /> */}
      </div>
      </nav>
    {showLeaderBoard && <LeaderBoardModal toggleModal={setShowLeaderBoard}/>}
    {showAllquestion && <AllQuestionsModal toggleModal={setshowAllquestion}/>}
    {!gameStart && <>
      <div className="startBtn-container">
        <div className="startBtn-center">
          <button className="startBtn" onClick={handleGameStart}>Start</button>
        </div>
      </div>
      {showQuestionModal && <AddQuestionModal user={userData} toggleModal={setShowQuestionModal}/>}
      
    </>}
    {gameStart && 
    <>
      {questions && <ProgressList maxQuestions={questions.length} prices={prices} onPriceSet={setPrices} progress={progress}/>}
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
      {isWon && <WinModal onReset={onWinReset} score={score}/>}
      {isLost && <LosingModal onReset={onLoseReset}/>}

    </>
    }
    </div>

  );
}
