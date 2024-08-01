import "./logOutModal.css";
import { useNavigate } from "react-router-dom";

export default function LogOutModal({toggleModal}) {

  const navigate = useNavigate()
  
  function handleClose (event) {
    if(event.target.id === 'overlay'){
      toggleModal(false);
    }
  }

  function handleLogOut(){
    localStorage.clear()
    navigate("/")
  }

  return (
    <div className="logout-modal-overlay" id="overlay" onClick={handleClose}>
      <div className="logout-modal-container">
        <div className="logout-modal-content">
          <h1>You sure?</h1> 
          <button onClick={handleLogOut}> log out </button>
        </div>
      </div>
    </div>
  )
}
