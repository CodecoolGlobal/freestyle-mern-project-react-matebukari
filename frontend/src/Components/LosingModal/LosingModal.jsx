import "./loseModal.css"

export default function LosingModal({onReset, savedScore}) {
  return (
    <div className="losing-modal-overlay">
      <div className="losing-modal-container">
        <div className="losing-modal-content">
          <h1>Sadly, you lost the game, but received {`${new Intl.NumberFormat('en-HU').format(savedScore)} Ft`}</h1>
          <button onClick={onReset}> RESTART</button>
        </div>
      </div>
    </div>
  )
}
