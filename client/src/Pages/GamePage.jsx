import { useEffect, useState } from "react";
import AddQuestionModal from "../Components/AddQuestionModal";
import GameQuestion from "../Components/GameQuestion";
import Answers from "../Components/Answers";
import WinModal from "../Components/WinModal";
import LosingModal from "../Components/LosingModal";
import ProgressList from "../Components/ProgressList";
import "./styles/gamePage.css";
import UserDropDown from "../Components/UserDropDown/UserDropDown";
import LeaderBoardModal from "../Components/LeaderBoardModal";
import AllQuestionsModal from "../Components/AllQusetionsModal";
import CheckpointModal from "../Components/CheckpointModal";
import LogOutModal from "../Components/LogOutModal/LogOutModal.jsx";
import useSound from 'use-sound';
import questionMusic from "../sounds/questionSound.mp3"
import checkpointMusic from "../sounds/checkpointSound.mp3"


const updateUser = async (user) => {
  const res = await fetch(`/api/user/${user._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return await res.json();
};

export default function GamePage() {
  const userJSON = localStorage.getItem("user");
  const userData = JSON.parse(userJSON);
  const [gameStart, setGameStart] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [isLost, setIsLost] = useState(false);
  const [score, setScore] = useState(0);
  const [prices, setPrices] = useState([]);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [showLeaderBoard, setShowLeaderBoard] = useState(false);
  const [showAllQuestion, setShowAllQuestion] = useState(false);
  const [showCheckpoint, setShowCheckpoint] = useState(false);
  const [showValidLogout, setShowValidLogout] = useState(false)
  const [questionSound, {stop}] = useSound(questionMusic);
  const [checkpointSound] = useSound(checkpointMusic);


  useEffect(()=> {
    
    if (questions !== null){
      questionSound();
      if((progress + 1) % (questions.length / 3) === 0 ) {
        setScore(prices[progress])
      }
      if ((progress === 0 ? 1 : progress) % (questions.length / 3) === 0) {
        setShowCheckpoint(true);
        checkpointSound();
      }
    }

  }, [ progress])

  function onLoseReset(){
    setGameStart(false);
    setIsLost(false);
    setProgress(0);
    setIsWon(false);
  }

  const newUser = {
    ...userData,
    score: (userData.score + score),
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
    setGameStart(true);
    questionSound();
  }

  function handleAddQuestion () {
    setShowQuestionModal(true);
  }

  function handleShowLeaderBoard () {
    setShowLeaderBoard(true);
  }

  function handleShowQuestions () {
    setShowAllQuestion(true);
  }

  function handleLogOut () {
    setShowValidLogout(true);
  }

  return (
    <div className="game-root">
      <nav className="nav-bar">
        {/* onMyQuestion={} onAllQuestion={} */}
        {/* <img src="./d*ckpic.jpg" alt="d*ckpic" /> */}
        {openDropDown && (
        <UserDropDown 
          onAddQuestion={handleAddQuestion} 
          onShowQuestions={handleShowQuestions} 
          onShowLeaderBoard={handleShowLeaderBoard} 
          onLogOut={handleLogOut}/>)}
      <div className="user"onClick={() => setOpenDropDown((prev) => !prev)}>{userData.name}</div>
      </nav>
    {showValidLogout && <LogOutModal toggleModal={setShowValidLogout}/>}
    {showLeaderBoard && <LeaderBoardModal toggleModal={setShowLeaderBoard}/>}
    {showAllQuestion && <AllQuestionsModal toggleModal={setShowAllQuestion}/>}
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
        correctAnswer={questions[progress].correctAnswer}
        difficulty={questions[progress].difficulty}/>}
      {/* <button onClick={() => setProgress((prev) => prev - 1)}>Prev</button>
      <button onClick={() => setProgress((prev) => prev + 1)}>Next</button> */}
      {isWon && <WinModal onReset={onWinReset} score={score}/>}
      {isLost && <LosingModal onReset={onLoseReset}/>}
      {showCheckpoint && ((progress === 0 ? 1 : progress) % (questions.length / 3) === 0) && <CheckpointModal onClose={setShowCheckpoint} score={score} onQuit={onWinReset}/>}
    </>
    }
    </div>

  );
}
