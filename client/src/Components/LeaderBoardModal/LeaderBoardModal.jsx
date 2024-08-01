import { useEffect, useState } from "react";
import "./leaderBoardModal.css"

async function fetchUsers () {
  const response = await fetch('/api/users');
  const result = await response.json();
  return result;
}

export default function LeaderBoardModal ({ toggleModal }) {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers () {
      const users = await fetchUsers();
      const sortedUsers = users.sort((c1, c2) => {
        return c2.score - c1.score;
      });
      setUsers(sortedUsers);
    }
    getUsers();
  }, [])

  function handleClose (event) {
    if(event.target.id === 'overlay'){
      toggleModal(false);
    }
  }
  
  return (
    <div className="modal-overlay" id="overlay" onClick={handleClose}>
      <div className='modal-container'>
        <div className='modal-content'>
        {users.length > 0 ? (
          <table className="leader-board">
            <thead>
              <tr>
                <th>Position</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{user.name}</td>
                  <td>{`${new Intl.NumberFormat('en-HU').format(user.score)} Ft`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <div>Loading...</div> }
        </div>
      </div>
    </div>
  )
}