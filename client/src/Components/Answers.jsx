import { useState } from "react";
import Supports from "./Supports";

export default function Answers ({answers, progress, correctAnswer, onProgress, onWinning, onLosing, maxQuestions, difficulty}){
  console.log(answers);
  const [hiddenAnswers, setHiddenAnswers] = useState([]);


  function handleAnswer(event){
    if (event.target.id === correctAnswer) {
      console.log('Corrtect answer');
      if (progress >= maxQuestions - 1){
        onWinning(true)
      } else {
        onProgress((prev) => prev + 1);
      }
    } else {
      console.log('worng answer');
      onLosing(true)
    }
  }


  return (
    <>
      <Supports correctAnswer={correctAnswer} onFiftyFifty={setHiddenAnswers} progress={progress} difficulty={difficulty}/>
      <div className="answers-container">
        <div className="answers-content">
          <div className={hiddenAnswers.includes('A') ? "answer-hide" : "answerA"} onClick={handleAnswer}><div className="letter">A: </div> <div id='A'>{answers.answerA}</div></div>
          <div className={hiddenAnswers.includes('B') ? "answer-hide" : "answerB"} onClick={handleAnswer}><div className="letter">B: </div> <div id='B'>{answers.answerB}</div></div>
          <div className={hiddenAnswers.includes('C') ? "answer-hide" : "answerC"} onClick={handleAnswer}><div className="letter">C: </div> <div id='C'>{answers.answerC}</div></div>
          <div className={hiddenAnswers.includes('D') ? "answer-hide" : "answerD"} onClick={handleAnswer}><div className="letter">D: </div> <div id='D'>{answers.answerD}</div></div>
        </div>
      </div>
    </>
  )
}