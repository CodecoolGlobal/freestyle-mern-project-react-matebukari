///craete validation for user name input

export default function UserNameInput ({ onNameInput }) {

  function handleInputChange (event) {
    const userName = event.target.value;
    onNameInput(userName);
    console.log(userName);
  }

  return (
    <>
      <label> User name:
        <input type="text" onChange={handleInputChange}/>
      </label>
    </>
  )
}