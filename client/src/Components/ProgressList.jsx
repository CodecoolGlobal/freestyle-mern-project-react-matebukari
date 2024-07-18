import { useState, useEffect } from "react";

export default function ProgressList ({ maxQuestions, prices, onPriceSet, progress}) {

  useEffect(() => {
    let prevPrices = [0, 15000];
    let newPrices = [];

    for (let i = 0; i < maxQuestions; i++) {
      const isOdd = i % 2;
      let currentPrice = prevPrices[0] + prevPrices[1];

      if (i < 5) {
        currentPrice = currentPrice * 2;
      }

      if (isOdd === 0) {
        prevPrices = [currentPrice, prevPrices[1]];
      } else {
        prevPrices = [prevPrices[0], currentPrice];
      }

      newPrices.push(currentPrice);
    }
    console.log(newPrices)
    onPriceSet(newPrices);
  }, []);

  return (
    <div className="progress-container">
      <div className="progress-content">
        {prices.map((value, i) => (
          <div className="progress-line" style={{background: progress === i ? 'white' : 'none'}}key={`progress-${i}`}>
            <div className="level"> {i + 1} </div>
            <div className="price"> {value} </div>
          </div>
        ))}
      </div>
    </div>
  );
}