import { useState } from "react";
import UserNameInput from "../Components/UserNameInput";
import UserPasswordInput from "../Components/UserPasswordInput";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [validLogin, setValidLogin] = useState(false);

  const navigate = useNavigate();

  async function handleLoginClick() {
    try {
      const ressposne = await fetch("/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, userPassword }),
      });
      const result = await ressposne.json();
      setValidLogin(result.success);

      if (result.success) {
        console.log('anyu');
        navigate('/game',{
          state: result.user
        })
      }
    } catch (error) {
      console.error(`szar minden is!! :,( ${error}`);
    }
  }

  return (
    <div>

      <UserNameInput onNameInput={setUserName} /> <br />
      <UserPasswordInput onPasswordInput={setUserPassword} /> <br />
      <button onClick={handleLoginClick}>Login</button>
    </div>
  );
}
