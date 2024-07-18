export default function WinModal({onReset}) {


  return (
    <div className="winning-container">
      <div className="winning-content">
        <h1>Grat</h1>
        <button onClick={onReset}> RESTART</button>
      </div>
    </div>
  )
}
