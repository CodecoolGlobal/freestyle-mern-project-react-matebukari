import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function Supports({ correctAnswer, onFiftyFifty, progress, difficulty }) {
  const [usedSupports, setUsedSupports] = useState([]);
  const [audienceAnswers, setAudienceAnswers] = useState({
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    answersCount: 0,
  });

  useEffect(() => {
    onFiftyFifty([]);
    setAudienceAnswers({ A: 0, B: 0, C: 0, D: 0, answersCount: 0 });
  }, [progress]);

  useEffect(() => {
    setTimeout(() => {
      if (audienceAnswers.answersCount !== 0) {
        const answers = ["A", "B", "C", "D"];
        const maxAudience = 50;
        if (audienceAnswers.answersCount < maxAudience) {
          const randomIndex = Math.floor(Math.random() * 4);
          const randomAnswer = answers[randomIndex];
  
          setAudienceAnswers((prev) => {
            return {
              ...prev,
              [randomAnswer]: prev[randomAnswer] + 1,
              answersCount: prev.answersCount + 1,
            };
          });
          if(audienceAnswers.answersCount % (5 * difficulty) === 0) {
            setAudienceAnswers((prev) => {
              return {
                ...prev,
                [correctAnswer]: prev[correctAnswer] + 1,
              };
            });
            console.log('hello');
          }
          console.log(audienceAnswers);
        }
      }
    }, 100);
    
  }, [audienceAnswers.answersCount]);

  function handleFiftyFity() {
    const remainingAnswers = [];
    console.log(remainingAnswers);
    const answers = ["A", "B", "C", "D"];
    while (remainingAnswers.length < 2) {
      const randomAnswerIndex = Math.floor(Math.random() * 4);
      if (
        !remainingAnswers.includes(answers[randomAnswerIndex]) &&
        answers[randomAnswerIndex] !== correctAnswer
      ) {
        remainingAnswers.push(answers[randomAnswerIndex]);
      }
    }
    setUsedSupports([...usedSupports, "fiftyFifty"]);
    onFiftyFifty(remainingAnswers);
  }

  function handleAudience() {
    setAudienceAnswers((prev) => ({
      ...prev,
      answersCount: prev.answersCount + 1,
    }));
    //setUsedSupports([...usedSupports, "audience"]);
    console.log(audienceAnswers);
  }

  function handlePhone() {
    setUsedSupports([...usedSupports, "phone"]);
  }

  const graphData = {
    labels: ["A", "B", "C", "D"],
    datasets: [
      {
        label: "Number of Audience Votes",
        data: [
          audienceAnswers.A,
          audienceAnswers.B,
          audienceAnswers.C,
          audienceAnswers.D,
        ],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const graphOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Votes",
        },
      },
      x: {
        title: {
          display: true,
          text: "Answers",
        },
      },
    },
  };

  return (
    <>
        <div className="supports-graph"
          style={{ height: "220px", width: "450px", backgroundColor: "white" }}
        >
          <Bar data={graphData} options={graphOptions} />
        </div>
      <div className="supports-container">
        <div className="supports-content">
          <button
            className="fifty-fifty"
            disabled={usedSupports.includes("fiftyFifty")}
            onClick={handleFiftyFity}
          >
            50:50
          </button>
          <button
            className="audience"
            onClick={handleAudience}
            disabled={usedSupports.includes("audience")}
          >
            audience
          </button>
          <button
            className="phone"
            onClick={handlePhone}
            disabled={usedSupports.includes("phone")}
          >
            Phone
          </button>
        </div>
      </div>
    </>
  );
}
