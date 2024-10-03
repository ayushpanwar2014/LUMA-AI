import React, { useContext } from 'react'
import apiRequest from '../../lib/apiRequest.js';
import { AuthContext } from '../../Context/AuthContext.jsx'
import { toast } from 'react-toastify'

const Login = (props) => {

    const { updateUser } = useContext(AuthContext);
    const handleOnClick = async (e) => {

        e.preventDefault();
        const formData = new FormData(e.target);

        const email = formData.get("email");
        const password = formData.get("password");

        try {

            const res = await apiRequest.post("/auth/login", {
                email,
                password
            });

            updateUser(res.data);
            toast.success("Whoops Logged In!!")

            props.handleOnClick();
        } catch (error) {

            console.log(error.response.data.message)
            toast.error("Invalid Credentials!!")

        }

    }

    return (

        <form onSubmit={handleOnClick}>
            <h1>Welcome Back</h1>
            <input type="email" placeholder='Email' name='email' required />
            <input type="password" placeholder='Password' name='password' required />
            <button className='b1'>Sign In</button>
        </form>

    )
}

export default Login
