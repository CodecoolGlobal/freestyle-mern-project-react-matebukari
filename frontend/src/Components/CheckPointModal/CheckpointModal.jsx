import "./checkpointModal.css"

export default function CheckpointModal ({ onQuit, score, onContinue}) {


  return (
    <div className="checkpoint-modal-overlay">
      <div className="checkpoint-modal-container">
        <div className="checkpoint-modal-content">
          <h1>Do you want to end your game now and win {`${new Intl.NumberFormat('en-HU').format(score)} Ft`}</h1> 
          <button onClick={onContinue}>No i want to continue</button> <br />
          <button onClick={onQuit}>Yes quit now</button>
        </div>
      </div>
    </div>
  )
}
