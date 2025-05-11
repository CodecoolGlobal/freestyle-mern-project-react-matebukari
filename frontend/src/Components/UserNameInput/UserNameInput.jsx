///craete validation for user name input

export default function UserNameInput ({ onNameInput }) {

  function handleInputChange (event) {
    const userName = event.target.value;
    onNameInput(userName);
  }

  return (
    <>
      <label className="user-name-label"> User name:
        <input className="user-name-input" type="text" onChange={handleInputChange}/>
      </label>
    </>
  )
}