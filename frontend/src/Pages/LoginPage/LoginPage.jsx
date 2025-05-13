import { useState } from "react";
import UserNameInput from "../../Components/UserNameInput/UserNameInput";
import UserPasswordInput from "../../Components/UserPasswordInput/UserPasswordInput";
import { useNavigate, Link } from "react-router-dom";
import "./loginPage.css";
import {useSoundContext} from "../../Context/SoundProvider.jsx";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [validLogin, setValidLogin] = useState(null);
  const {playTheme} = useSoundContext();

  const navigate = useNavigate();

  async function handleLoginClick() {
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });
      const result = await response.json();
      setValidLogin(response.ok);
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(result));
        playTheme();
        navigate('/game');
      }
    } catch (error) {
      console.error(`Sadly: ${error}`);
    }
  }


  return (
    <div className="login-container">
            {validLogin ? (
        <h1>Successfully Login!!!</h1>
      ) : validLogin !== null ? (
        <h1>Unsuccessfully Login!!!</h1>
      ) : ( //loggedOut ? (<h1>Logged out successfully!!</h1>) :
        <></>
      )}
      <UserNameInput onNameInput={setName} /> <br />
      <UserPasswordInput onPasswordInput={setPassword} /> <br />
      <button className="login-button" onClick={handleLoginClick}>Login</button>
      <br></br>
      <div className="register-link">
        <Link to={'/register'}>Register page</Link>
      </div>
    </div>
  );
}
