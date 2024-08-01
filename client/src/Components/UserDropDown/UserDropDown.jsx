import React, { useState } from "react";
import "./UserDropDown.css";
import { useNavigate } from "react-router-dom";

export default function UserDropDown ({onAddQuestion, onShowLeaderBoard, onShowQuestions, onLogOut}) {
const navigate = useNavigate()

function onMyQuestion(){
  const userJSON = localStorage.getItem("user");
  const userId = JSON.parse(userJSON)._id;
  navigate(`/questions-by-user/${userId}`)
}



  return (
    <div className="user-dropdown">
        <ul className="user-dropdown-list">
          <li>
          <button onClick={onAddQuestion}>Add question</button>
          </li>
          <br/>
          <li>
          <button onClick={onMyQuestion}>My questions</button>
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
          <button onClick={onLogOut}>Log out</button>
          </li>
        </ul>
    </div>

  )

}