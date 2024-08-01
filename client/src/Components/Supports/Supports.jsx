import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./supportFeatures.css"

export default function Supports({
  correctAnswer,
  onFiftyFifty,
  progress,
  difficulty,
}) {
  const [usedSupports, setUsedSupports] = useState([]);
  const [remainingAnswers, setRemainingAnswers] = useState([]);
  const [audienceAnswers, setAudienceAnswers] = useState({
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    answersCount: 0,
  });
  const [showVotes, setShowVotes] = useState(false);
  const [showJoker, setShowJoker] = useState(false);

  useEffect(() => {
    onFiftyFifty([]);
    setAudienceAnswers({ A: 0, B: 0, C: 0, D: 0, answersCount: 0 });
    setShowVotes(false);
    setShowJoker(false);
  }, [progress]);

  useEffect(() => {
    setTimeout(() => {
      if (audienceAnswers.answersCount !== 0) {
        const answers = ["A", "B", "C", "D"];
        const maxAudience = 50;
        let randomIndex = Math.floor(Math.random() * 4);
        let randomAnswer = answers[randomIndex];
        if (remainingAnswers.length !== 0) {
          randomIndex = Math.floor(Math.random() * 2);
          randomAnswer = remainingAnswers[randomIndex];
          console.log(remainingAnswers);
        }
        if (audienceAnswers.answersCount < maxAudience) {
          setAudienceAnswers((prev) => {
            return {
              ...prev,
              [randomAnswer]: prev[randomAnswer] + 1,
              answersCount: prev.answersCount + 1,
            };
          });
          if (audienceAnswers.answersCount % (5 * difficulty) === 0) {
            console.log(correctAnswer);
            setAudienceAnswers((prev) => {
              return {
                ...prev,
                [correctAnswer]: prev[correctAnswer] + 2,
              };
            });
            console.log("hello");
          }
          console.log(audienceAnswers);
        }
      }
    }, 100);
  }, [audienceAnswers.answersCount]);

  function handleFiftyFity() {
    const hiddenAnswers = [];
    const remainingAnswers = [];
    console.log(hiddenAnswers);
    const answers = ["A", "B", "C", "D"];
    while (hiddenAnswers.length < 2) {
      const randomAnswerIndex = Math.floor(Math.random() * 4);
      if (
        !hiddenAnswers.includes(answers[randomAnswerIndex]) &&
        answers[randomAnswerIndex] !== correctAnswer
      ) {
        hiddenAnswers.push(answers[randomAnswerIndex]);
      }
    }
    while (remainingAnswers.length < 2) {
      const randomAnswerIndex = Math.floor(Math.random() * 4);
      if (
        !remainingAnswers.includes(answers[randomAnswerIndex]) &&
        !hiddenAnswers.includes(answers[randomAnswerIndex])
      ) {
        remainingAnswers.push(answers[randomAnswerIndex]);
      }
    }
    setUsedSupports([...usedSupports, "fiftyFifty"]);
    setRemainingAnswers(remainingAnswers);
    onFiftyFifty(hiddenAnswers);
  }

  function handleAudience() {
    setAudienceAnswers((prev) => ({
      ...prev,
      answersCount: prev.answersCount + 1,
    }));
    setUsedSupports([...usedSupports, "audience"]);
    setShowVotes(true);
    console.log(audienceAnswers);
  }

  function handleJoker() {
    setShowJoker(true);
    setUsedSupports([...usedSupports, "joker"]);
  }

  const graphData = {
    labels: ["A", "B", "C", "D"],
    datasets: [
      {
        label: "Audience Votes",
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
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Votes",
          color: "white",
          font: {
            size: 24, // Change the font size of the y-axis title
          },
        },
        ticks: {
          color: "white",
          font: {
            size: 24, // Change the font size of the y-axis labels
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Optional: light white grid lines
        },
      },
      x: {
        title: {
          display: true,
          text: "Answers",
          color: "white",
          font: {
            size: 24, // Change the font size of the x-axis title
          },
        },
        ticks: {
          color: "white",
          font: {
            size: 24, // Change the font size of the x-axis labels
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Optional: light white grid lines
        },
      },
    },
  };
  return (
    <>
      {showVotes && (
        <div className="supports-graph">
          <Bar data={graphData} options={graphOptions} />
        </div>
      )}
      {showJoker && (
        <div className="supports-joker-container">
          <div className="card">
            <div className="text top">JOKER</div>
            <div className="supports-joker-content">{correctAnswer}</div>
            <div className="text bottom">JOKER</div>
          </div>
        </div>
      )}
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
            <img className="support-img" src=".\src\Components\Supports\assets\audience.png"></img>
          </button>
          <button
            className="joker"
            onClick={handleJoker}
            disabled={usedSupports.includes("joker")}
          >
            <img className="support-img" src=".\src\Components\Supports\assets\joker.png"></img>
          </button>
        </div>
      </div>
    </>
  );
}
