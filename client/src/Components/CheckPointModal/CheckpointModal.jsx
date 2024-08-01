import "./checkpointModal.css"

export default function CheckpointModal ({ onClose, onQuit, score}) {

  function closeModal () {
    onClose(false);
  }

  return (
    <div className="checkpoint-modal-overlay">
      <div className="checkpoint-modal-container">
        <div className="checkpoint-modal-content">
          <h1>Do you want to end your game now and win {`${new Intl.NumberFormat('en-HU').format(score)} Ft`}</h1> 
          <button onClick={closeModal}>No i want to continue</button> <br />
          <button onClick={onQuit}>Yes quit now</button>
        </div>
      </div>
    </div>
  )
}
