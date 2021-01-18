import React, { useContext, useState, useEffect } from 'react';
import { joinRoom } from '../../api/index';
import { GlobalContext } from '../../globalState';

let onFirstLoad = true;

const Room = () => {
  const { globalState } = useContext(GlobalContext);
  const [isEstimateEnabled, setEstimateEnabled] = useState(true),
    [users, setUsers] = useState([]);
  console.log(globalState)
  useEffect(() => {
    //  joinRoom(name, (err, users) => {
    //    console.log(users)
    //   // if (!err) {
    //   //   // redirect to room
    //   //   props.history.push(ROOM_URL)
    //   // }

    //   // // TODO ERROR HANDLING
    // })


    // socket.on('updateUsers', (users) => {
    //   setUsers(users);
    // })

    // socket.on('updateUsers', (users) => {
    //   setUsers(users);
    // })

    onFirstLoad = false;
  });

  const submitEstimate = (e) => {
    const estimateValue = e.target.textContent;

    setEstimateEnabled(false);
    // lock until everyone as submitted

    console.log(estimateValue)
  }

  return (
    <React.Fragment>
      <h1>Room</h1>
      {users.length > 0 && (
        <ul>
          {(users || []).map((user, i) => {
            return <li key={i}>{user.name}</li>
          })}
        </ul>
      )}
      {isEstimateEnabled && (
        <div>
          <button type="button" className="card" onClick={submitEstimate}>1</button>
          <button type="button" className="card" onClick={submitEstimate}>2</button>
          <button type="button" className="card" onClick={submitEstimate}>3</button>
          <button type="button" className="card" onClick={submitEstimate}>4</button>
        </div>
      )}

    </React.Fragment >
  );
}

export default Room;