import React from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {
    const { register, handleSubmit, errors } = useForm();
    const fields = {
        loginEmail: 'Email'
    }

    const onSubmit = (data) => {
        console.log(data)

        fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            console.log(response.status);
            console.log(response);
            return response.json()
        }).then(data => {
            console.log(data)
        }).catch(error => {
            console.log(error)
        })

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
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-field">
                <label htmlFor="login-email">Email</label>
                <input type="email"
                    name={fields.loginEmail}
                    id="login-email"
                    ref={register({ 
                        required: true ,
                        pattern: /[\w.+\-]*@codehousegroup\.com(\W|$)/
                    })}
                />
                {(errors[fields.loginEmail] && errors[fields.loginEmail].type === 'required') &&
                    <p className="err">This field is required.</p>
                }
                {(errors[fields.loginEmail] && errors[fields.loginEmail].type === 'pattern') &&
                    <p className="err">Please enter a valid email.</p>
                }
            </div>
            <div>
                <button className="btn btn--grey" type="submit">Submit</button>
            </div>
        </form>
    );
}

export default Login;