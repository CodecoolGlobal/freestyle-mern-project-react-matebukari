import "./loseModal.css"

export default function LosingModal({onReset}) {
  return (
    <div className="losing-modal-overlay">
      <div className="losing-modal-container">
        <div className="losing-modal-content">
          <h1>Sadly, you lost the game </h1> 
          <button onClick={onReset}> RESTART</button>
        </div>
      </div>
    </div>
  )
}
