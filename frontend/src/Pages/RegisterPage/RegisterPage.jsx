import { useState } from "react";
import UserNameInput from "../../Components/UserNameInput/UserNameInput";
import UserPasswordInput from "../../Components/UserPasswordInput/UserPasswordInput";
import { Link } from "react-router-dom";
import "./registerPage.css"

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [validRegister, setValidRegister] = useState(null);

  async function handleRegisterClick() {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });
      setValidRegister(response.ok);
    } catch (error) {
      console.error(`I apologize: ${error}`);
    }
  }

  return (
    <div className="register-container">
      {validRegister ? (
        <h1>Successful registration!!!</h1>
      ) : validRegister !== null ? (
        <h1>Unsuccessful Registration!!!</h1>
      ) : (
        <></>
      )}
      <UserNameInput onNameInput={setName} /> <br />
      <UserPasswordInput onPasswordInput={setPassword} /> <br />
      <button className="register-button" onClick={handleRegisterClick}>Register</button>
      <br></br>
      <div className="login-link">
        <Link to={'/'}>login page</Link>
      </div>
    </div>
  );
}
