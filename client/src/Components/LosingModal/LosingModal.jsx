import "./loseModal.css"

export default function LosingModal({onReset}) {
  return (
    <div className="modal-overlay">
      <div className="losing-container">
        <div className="losing-content">
          <h1>Sadly, you lost the game </h1> 
          <button onClick={onReset}> RESTART</button>
        </div>
      </div>
    </div>
  )
}
