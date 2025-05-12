import {useEffect, useState} from "react";
import AddQuestionModal from "../../Components/AddQuestionModal/AddQuestionModal.jsx";
import GameQuestion from "../../Components/GameQuestion/GameQuestion.jsx";
import Answers from "../../Components/Answers/Answers.jsx";
import WinModal from "../../Components/WinModal/WinModal.jsx";
import LosingModal from "../../Components/LosingModal/LosingModal.jsx";
import ProgressList from "../../Components/ProgressList/ProgressList.jsx";
import "./gamePage.css";
import UserDropDown from "../../Components/UserDropDown/UserDropDown.jsx";
import LeaderBoardModal from "../../Components/LeaderBoardModal/LeaderBoardModal.jsx";
import AllQuestionsModal from "../../Components/AllQuestionsModal/AllQuestionsModal.jsx";
import CheckpointModal from "../../Components/CheckPointModal/CheckpointModal.jsx";
import LogOutModal from "../../Components/LogOutModal/LogOutModal.jsx";
import {useSoundContext} from "../../Context/SoundProvider.jsx";


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
    const [showValidLogout, setShowValidLogout] = useState(false);
    const [savedScore, setSavedScore] = useState(0);
    const {playCheckpoint, playQuestion, stopAllSound} = useSoundContext();

    useEffect(() => {
        if (questions !== null) {
            stopAllSound();
            setScore(prices[progress])
            if ((progress === 0 ? 1 : progress + 1) % (questions.length / 3) === 0) {
                playCheckpoint();
            } else {
                playQuestion();
            }
        }

    }, [progress, prices.length]);

    function onLoseReset() {
        setGameStart(false);
        setIsLost(false);
        setProgress(0);
        setIsWon(false);
        updateUser({
            ...userData,
            score: (userData.score + score),
        });
    }

    function onWinReset() {
        setGameStart(false);
        setIsLost(false);
        setProgress(0);
        setIsWon(false);
        setShowCheckpoint(false);
        updateUser({
            ...userData,
            score: (userData.score + score),
        });
    }

    async function handleGameStart() {
        const response = await fetch('/api/questions-ingame');
        const result = await response.json();
        setQuestions(result.questions);
        setGameStart(true);
        stopAllSound();
    }

    function handleAddQuestion() {
        setShowQuestionModal(true);
    }

    function handleShowLeaderBoard() {
        setShowLeaderBoard(true);
    }

    function handleShowQuestions() {
        setShowAllQuestion(true);
    }

    function handleLogOut() {
        setShowValidLogout(true);
    }

    function handleContinue() {
        if((progress === 0 ? 1 : progress + 1) % (questions.length / 3) === 0){
            setSavedScore(prices[progress]);
        }
        setShowCheckpoint(false);
        setProgress(prev => prev + 1);
    }

    return (
        <div className="game-root">
            <nav className="nav-bar">
                {openDropDown && (
                    <UserDropDown
                        onAddQuestion={handleAddQuestion}
                        onShowQuestions={handleShowQuestions}
                        onShowLeaderBoard={handleShowLeaderBoard}
                        onLogOut={handleLogOut}/>)}
                <div className="user" onClick={() => setOpenDropDown((prev) => !prev)}>{userData.name}</div>
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
                    {questions && <ProgressList maxQuestions={questions.length} prices={prices} onPriceSet={setPrices}
                                                progress={progress}/>}
                    {questions && <GameQuestion questions={questions} progress={progress}/>}
                    {questions && <Answers
                        answers={questions[progress].answers}
                        progress={progress}
                        onWinning={setIsWon}
                        onLosing={setIsLost}
                        maxQuestions={questions.length}
                        correctAnswer={questions[progress].correctAnswer}
                        difficulty={questions[progress].difficulty}
                        onCorrectAnswer={setShowCheckpoint}/>}
                    {isWon && <WinModal onReset={onWinReset} score={score}/>}
                    {isLost && <LosingModal savedScore={savedScore} onReset={onLoseReset}/>}
                    {showCheckpoint && <CheckpointModal score={score} onContinue={handleContinue} onQuit={onWinReset}/>}
                </>
            }
        </div>

    );
}
