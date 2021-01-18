import React from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {
    const { register, handleSubmit, errors } = useForm();
    const fields = {
        registerName: 'Name',
        registerEmail: 'Email',
    }

    const onSubmit = (data) => {
        console.log(data)

        fetch('/api/user/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).then(data => console.log(data))

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
                <label htmlFor="register-name">Name</label>
                <input type="text" name={fields.registerName} id="register-name" ref={register({ required: true })} />
                {errors[fields.registerName] && <p className="err">This field is required</p>}
            </div>
            <div className="form-field">
                <label htmlFor="register-email">Email</label>
                <input type="email" name={fields.registerEmail} id="register-email" ref={register({ required: true })} />
                {errors[fields.registerEmail] && <p className="err">This field is required</p>}
            </div>
            <div>
                <button className="btn btn--grey" type="submit">Submit</button>
            </div>
        </form>
    );
}

export default Register;