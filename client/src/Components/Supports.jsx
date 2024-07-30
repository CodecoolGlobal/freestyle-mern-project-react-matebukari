import { useEffect, useState } from "react";

export default function Supports({correctAnswer, onFiftyFifty, progress}) {

  const [usedSupports, setUsedSupports] = useState([]);

  useEffect(() => {
    onFiftyFifty([]);
  },[progress]);

  function handleFiftyFity() {
    const remainingAnswers = [];
    console.log(remainingAnswers);
    const answers = ['A', 'B', 'C', 'D'];
    while(remainingAnswers.length < 2) {
      const randomAnswerIndex = Math.floor(Math.random() * 4);
      if (!remainingAnswers.includes(answers[randomAnswerIndex]) && answers[randomAnswerIndex] !== correctAnswer) {
        remainingAnswers.push(answers[randomAnswerIndex]);
      }
    }
    setUsedSupports([...usedSupports, 'fiftyFifty']);
    onFiftyFifty(remainingAnswers);
  }

  function handleAudience() {

    setUsedSupports([...usedSupports, 'audience']);
  }

  function handlePhone() {

    setUsedSupports([...usedSupports, 'phone']);
  }

  return (
    <div className="supports-container">
      <div className="supports-content">
        <button className="fifty-fifty" disabled={usedSupports.includes("fiftyFifty")} onClick={handleFiftyFity}>50:50</button>
        <button className="audience" onClick={handleAudience} disabled={usedSupports.includes("audience")}>audience</button>
        <button className="phone" onClick={handlePhone} disabled={usedSupports.includes("phone")}>Phone</button>
      </div>

    </div>
  )
}