import React from 'react';
import { useForm } from 'react-hook-form';

const LoggedIn = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const fields = {
    gameName: 'game-name',
    registerEmail: 'register-email',
    loginEmail: 'login-email'
  };

  const onSubmit = (data) => {
    console.log(data)
    // addUser(data.name, (err) => {
    //   if (!err) {
    //     // update user in application
    //     addCurrentUser(data.name);
    //     // redirect to room
    //     props.history.push(ROOM_URL)
    //   }

    //   // TODO ERROR HANDLING
    // })

  };

  return (
    <div>
      <h2 className="welcome__sub-title">Welcome back, Callum!</h2>
      <h3 className="welcome__sub-title">Create game</h3>
      <form key={1} onSubmit={handleSubmit(onSubmit)}>
        <div className="form-field">
          <label htmlFor="game-name">Game Name</label>
          <input type="text" name={fields.gameName} id="game-name" ref={register({ required: true })} />
          {errors[fields.gameName] && <p>This field is required</p>}
        </div>
        <div>
          <button className="btn btn--grey" type="submit">Create</button>
        </div>
      </form>
      <p className="welcome__sep"><span className="welcome__sep-text">or</span></p>
      <div>
        <h3 className="welcome__sub-title">Join Active Game</h3>
        <ul>
          <li>Clarion - Estimate 11/05</li>
          <li>Clarion - Estimate 18/05</li>
        </ul>
      </div>
    </div>
  );
}

export default LoggedIn;