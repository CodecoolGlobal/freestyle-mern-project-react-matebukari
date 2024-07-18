///craete validation for user password input

export default function UserPasswordInput ({ onPasswordInput }) {

  function handleInputChange (event) {
    const userPassword = event.target.value;
    onPasswordInput(userPassword);
    console.log(userPassword);
  }

  return (
    <>
      <label className="user-password-label"> User Password:
        <input className="user-password-input" type="password" onChange={handleInputChange}/>
      </label>
    </>
  )
}