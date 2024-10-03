import React from 'react'
import apiRequest from '../../lib/apiRequest.js';
import { toast } from 'react-toastify'

const Register = (props) => {

    const handleOnClick = async (e) => {

        e.preventDefault();
        const formData = new FormData(e.target);

        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");


        try {

            const res = await apiRequest.post("/auth/register", {
                username,
                email,
                password
            });

            console.log(res.data)
            toast.success("User Created yeh!! Lets Goo XD")
            props.handleOnChange();

        } catch (error) {

            console.log(error);
            toast.error("Something is not Right!!")

        }

    }

    return (


        <form onSubmit={handleOnClick}>
            <h1>Create an a Account</h1>
            <input type="text" placeholder='Username' name='username' minLength={3} maxLength={20} />
            <input type="email" placeholder='Email' name='email' required />
            <input type="password" placeholder='Password' name='password' required />
            <button className='b1'  > Sign Up</button>
        </form>
    )
}

export default Register
