import { useState } from "react";
import UserNameInput from "../Components/UserNameInput";
import UserPasswordInput from "../Components/UserPasswordInput";

export default function LoginPage () {

  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [validLogin, setValidLogin] = useState(false);

  async function handleLoginClick () {
    
    setValidLogin(true);
  }

return (
  <div>
    <UserNameInput onNameInput={setUserName}/> <br />
    <UserPasswordInput onPasswordInput={setUserPassword}/> <br />
    <button onClick={handleLoginClick}>Login</button>
  </div>
)
}