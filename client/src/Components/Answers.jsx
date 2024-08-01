import { useState } from "react";
import Supports from "./Supports/Supports";
import "../Pages/styles/answers.css"

export default function Answers ({answers, progress, correctAnswer, onProgress, onWinning, onLosing, maxQuestions, difficulty}){
  const [hiddenAnswers, setHiddenAnswers] = useState([]);

  function handleAnswer(selectedAnswer, event) {
  let chosenAnswer; 
    if (event.target.className === `answer${selectedAnswer}`) {
      chosenAnswer = event.target
    } else {
      chosenAnswer = event.target.parentNode
    }
    chosenAnswer.style.backgroundColor = "yellow";
    chosenAnswer.style.color = "black";

    setTimeout(() => {
      if (selectedAnswer === correctAnswer) {
        chosenAnswer.style.backgroundColor = "green";
        chosenAnswer.style.color = "white";
      } else {
        chosenAnswer.style.backgroundColor = "red";
        chosenAnswer.style.color = "white";
      }
    }, 3000);

    setTimeout(() => {

      chosenAnswer.style.backgroundColor = "";
      chosenAnswer.style.color = "";

      if (selectedAnswer === correctAnswer) {
        if (progress >= maxQuestions - 1) {
          onWinning(true);
        } else {
          onProgress(prev => prev + 1);
        }
      } else {
        onLosing(true);
      }
    }, 5000);
  }


  return (
    <>
      <Supports correctAnswer={correctAnswer} onFiftyFifty={setHiddenAnswers} progress={progress} difficulty={difficulty}/>
      <div className="answers-container">
        <div className="answers-content">
          <div className={hiddenAnswers.includes('A') ? "answer-hide" : "answerA"} onClick={(event) => handleAnswer('A', event)}>
            <div className="letter" >
              A: 
            </div> 
            <div>
              {answers.answerA}
              </div>
            </div>
          <div className={hiddenAnswers.includes('B') ? "answer-hide" : "answerB"} onClick={(event) => handleAnswer('B', event)}>
            <div className="letter">
              B: 
            </div> 
            <div>
              {answers.answerB}
            </div>
          </div>
          <div className={hiddenAnswers.includes('C') ? "answer-hide" : "answerC"} onClick={(event) => handleAnswer('C', event)}>
            <div className="letter">
              C: 
            </div> 
            <div>
              {answers.answerC}
            </div>
          </div>
          <div className={hiddenAnswers.includes('D') ? "answer-hide" : "answerD"} onClick={(event) => handleAnswer('D', event)}>
            <div className="letter">
              D: 
            </div> 
            <div>
              {answers.answerD}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}