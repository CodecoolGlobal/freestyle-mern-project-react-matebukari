import "./winModal.css"

export default function WinModal({onReset, score}) {
  return (
    <div className="modal-overlay">
      <div className="winning-container">
        <div className="winning-content">
          <h1>Grat</h1>
          <h2>prize: {`${new Intl.NumberFormat('en-HU').format(score)} Ft`}</h2>
          <button onClick={onReset} > RESTART</button>
        </div>
      </div>
    </div>
  )
}
