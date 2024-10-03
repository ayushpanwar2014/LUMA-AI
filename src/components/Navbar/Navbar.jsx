import React, { useContext } from 'react'
import './Navbar.css'
import { AuthContext } from '../Context/AuthContext'
import apiRequest from '../lib/apiRequest'
import { toast } from 'react-toastify'


const Navbar = (props) => {

    const { currentUser, updateUser } = useContext(AuthContext);

  const handleOnLogOut = async () => {

    try {

        const res = await apiRequest.post("/auth/logout")

        updateUser(null);
        toast.success("User Logged Out!!")
        console.log(res.data)
        
    } catch (error) {
        console.log(error)
        toast.error("Something is not Right");
    }
}

  return (
    <div className='navbar'>
        <div className="item"> <p>Luma-AI</p></div>
        <div className="item">
        <div className="darkmode">
                        <img onClick={props.handleMode} src={props.mode && "sun.svg" || "moon.svg"} alt="" />
                    </div>
                       {currentUser && <span>{currentUser.username}</span>} 
                    <div className="signIn">
                        {currentUser ? (
                            <button className='btn' onClick={handleOnLogOut}>Log Out</button>
                        ) : (
                            <button className='btn' onClick={props.handleOnClick}>Sign In</button>
                        )

                        }
                    </div>
        </div>
      
    </div>
  )
}

export default Navbar
