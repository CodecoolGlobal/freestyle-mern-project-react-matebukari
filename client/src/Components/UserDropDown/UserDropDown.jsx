import React from "react";
import "./UserDropDown.css";
import { useNavigate } from "react-router-dom";

export default function UserDropDown ({onAddQuestion, onShowLeaderBoard, onShowQuestions}) {
//onMyQuestion, onAllQuestion,
//onClick={onMyQuestion}
//onClick={onAllQuestion}

console.log(onShowLeaderBoard)
console.log(onShowQuestions)

const navigate = useNavigate()

function handleLogOut(){
  localStorage.clear()
  navigate("/")
}


  return (
    <div className="user-dropdown">
        <ul className="user-dropdown-list">
          <li>
          <button onClick={onAddQuestion}>Add question</button>
          </li>
          <br/>
          <li>
          <button >My questions</button>
          </li>
          <br/>
          <li>
          <button onClick={onShowQuestions} >All questions</button>
          </li>
          <br/>
          <li>
          <button onClick={onShowLeaderBoard}>Leader Booard</button>
          </li>
          <br/>
          <li>
          <button onClick={handleLogOut}>Log out</button>
          </li>
        </ul>
    </div>

  )

}