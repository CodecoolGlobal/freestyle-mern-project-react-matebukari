import { useEffect } from "react";

export default function ProgressList ({ maxQuestions, prices, onPriceSet, progress}) {


  useEffect(() => {
    let prevPrices = [15000, 0];
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
          <div className="progress-line" style={{background: progress === i ? 'rgba(255, 255, 255, 0.8)' : (i + 1) % (maxQuestions / 3) === 0 ? 'rgba(0, 125, 190, 0.8)' : 'none', color: progress === i ? 'black' : 'white'}}key={`progress-${i}`}>
            <div className="level"> {i + 1} </div>
            <div className="price"> {`${new Intl.NumberFormat('en-HU').format(value)} Ft`} </div>
          </div>
        ))}
      </div>
    </div>
  );
}