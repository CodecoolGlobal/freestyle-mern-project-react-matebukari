import "../Pages/styles/checkpointModal.css"

export default function CheckpointModal ({ onClose, onQuit, score}) {

  function closeModal () {
    onClose(false);
  }

  return (
    <div className="modal-overlay">
      <div className="checkpoint-container">
        <div className="checkpoint-content">
          <h1>Do you want to end your game now and win {score} Ft</h1> 
          <button onClick={closeModal}>No i want to continue</button> <br />
          <button onClick={onQuit}>Yes quit now</button>
        </div>
      </div>
    </div>
  )
}
