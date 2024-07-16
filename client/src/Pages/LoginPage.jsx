import { useState } from "react";
import UserNameInput from "../Components/UserNameInput";
import UserPasswordInput from "../Components/UserPasswordInput";

export default function LoginPage () {

  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');

return (
  <div>
    <UserNameInput/>
    <UserPasswordInput/>
  </div>
)
}