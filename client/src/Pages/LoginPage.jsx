import { useState } from "react";
import UserNameInput from "../Components/UserNameInput";
import UserPasswordInput from "../Components/UserPasswordInput";
import { useNavigate, Link } from "react-router-dom";
import "./styles/loginPage.css";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [validLogin, setValidLogin] = useState(null);

  const navigate = useNavigate();

  async function handleLoginClick() {
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, userPassword }),
      });
      const result = await response.json();
      setValidLogin(result.success);
      console.log(result.user);
      if (result.success) {
        localStorage.setItem("user", JSON.stringify(result.user));
        console.log('anyu');
        navigate('/game')
      }
    } catch (error) {
      console.error(`szar minden is!! :,( ${error}`);
    }
  }


  return (
    <div className="login-container">
            {validLogin ? (
        <h1>Successfull Login!!!</h1>
      ) : validLogin !== null ? (
        <h1>Unsuccessfull Login!!!</h1>
      ) : ( //loggedOut ? (<h1>Logged out successfully!!</h1>) :
        <></>
      )}
      <UserNameInput onNameInput={setUserName} /> <br />
      <UserPasswordInput onPasswordInput={setUserPassword} /> <br />
      <button className="login-button" onClick={handleLoginClick}>Login</button>
      <br></br>
      <div className="register-link">
        <Link to={'/register'}>Register page</Link>
      </div>
    </div>
  );
}
