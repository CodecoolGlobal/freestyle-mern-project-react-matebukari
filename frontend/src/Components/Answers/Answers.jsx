import { useState } from "react";
import Supports from "../Supports/Supports";
import "./answers.css"

export default function Answers ({answers, progress, correctAnswer, onWinning, onLosing, maxQuestions, difficulty, onCorrectAnswer}){
    const [hiddenAnswers, setHiddenAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answerStatus, setAnswerStatus] = useState(null);

    const handleAnswer = (selectedKey) => {
        if (selectedAnswer) return;
        setSelectedAnswer(selectedKey);
        setTimeout(() => {
            const isCorrect = selectedKey === correctAnswer;
            setAnswerStatus(isCorrect ? 'correct' : 'incorrect');
            setTimeout(() => {
                setSelectedAnswer(null);
                setAnswerStatus(null);
                if (isCorrect) {
                    if (progress >= maxQuestions - 1) {
                        onWinning(true);
                    } else {
                        onCorrectAnswer(true);
                    }
                } else {
                    onLosing(true);
                }
            }, 1000);
        }, 2000);
    };

    const getAnswerClassName = (answerKey) => {
        if (hiddenAnswers.includes(answerKey)) return "answer-hide";

        const baseClass = `answer answer-${answerKey}`;
        if (selectedAnswer === answerKey) {
            return `${baseClass} ${answerStatus || 'selected'}`;
        }
        return baseClass;
    };

    return (
        <>
            <Supports
                correctAnswer={correctAnswer}
                onFiftyFifty={setHiddenAnswers}
                progress={progress}
                difficulty={difficulty}
            />
            <div className="answers-container">
                <div className="answers-content">
                    {['A', 'B', 'C', 'D'].map((key) => (
                        <div
                            key={key}
                            className={getAnswerClassName(key)}
                            onClick={() => handleAnswer(key)}
                        >
                            <div className="letter">{key}:</div>
                            <div>{answers[`answer${key}`]}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}