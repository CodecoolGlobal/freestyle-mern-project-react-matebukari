import { useState } from "react";
import UserNameInput from "../Components/UserNameInput";
import UserPasswordInput from "../Components/UserPasswordInput";
import "./registerPage.css"

export default function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [validRegister, setValidRegister] = useState(null);

  async function handleRegisterClick() {
    try {
      const ressposne = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, userPassword }),
      });
      const result = await ressposne.json();
      setValidRegister(result.success);
    } catch (error) {
      console.error("szar az egész!! :,(");
    }
  }

  return (
    <div className="register-container">
      {validRegister ? (
        <h1>Succesfull registration!!!</h1>
      ) : validRegister !== null ? (
        <h1>Unsuccselfull Registration!!!</h1>
      ) : (
        <></>
      )}
      <UserNameInput onNameInput={setUserName} /> <br />
      <UserPasswordInput onPasswordInput={setUserPassword} /> <br />
      <button className="register-button" onClick={handleRegisterClick}>Register</button>
    </div>
  );
}
