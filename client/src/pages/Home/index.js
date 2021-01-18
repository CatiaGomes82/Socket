import React, { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { GlobalContext } from '../../globalState';
import { ROOM_URL } from '../../settings/urls';
import { addUser } from '../../api/index';
import { addCurrentUser } from '../../actions/userActions';
import LogoIcon from './LogoIcon';

import LoggedIn from './LoggedIn';
import LoggedOut from './LoggedOut';

import './index.css';

const Home = (props) => {
  const { dispatch } = useContext(GlobalContext);
  const { register, handleSubmit, errors } = useForm();
  const [ isLoggedIn, setLoggedIn ] = useState(false);
  const LOGIN_KEY = 'CHGPlanPokerId';

  // const onSubmit = (data) => {
  // console.log(data)
  // addUser(data.name, (err) => {
  //   if (!err) {
  //     // update user in application
  //     addCurrentUser(data.name);
  //     // redirect to room
  //     props.history.push(ROOM_URL)
  //   }

  //   // TODO ERROR HANDLING
  // })

  //};
  
  useEffect(() => {
    const userId = localStorage.getItem(LOGIN_KEY, 'Tom');

    if (userId) {
      console.log(userId)
     // fetch()
    }

   // localStorage.setItem(LOGIN_KEY, 'Tom');
    return () => {
      
    }
  }, [])

  return (
    <section className="welcome">
      <h1 className="welcome__title">Poker Plan</h1>
      <div className="welcome__container">
        <LogoIcon className="welcome__logo" />
        {isLoggedIn ? (
          <LoggedIn />
        ) : (
            <LoggedOut setLoggedIn={setLoggedIn} />
          )}
      </div>
    </section>
  );
}

export default Home;