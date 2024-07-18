export default function LosingModal({onReset}) {


  return (
    <div className="losing-container">
      <div className="losing-content">
        <h1>Srry bro</h1>
        <button onClick={onReset}> RESTART</button>
      </div>
    </div>
  )
}
