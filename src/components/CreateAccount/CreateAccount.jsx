import "./CreateAccount.scss"
import React, { useState } from 'react'
import Login from "./Login/Login";
import Register from "./Register/Register";


const CreateAccount = (props) => {

    const [change, setChange] = useState(true);
    const [open, setOpen] = useState(false);

    const handleOnChange = () => {

        setChange((prev) => !prev);
        console.log("click")
        setOpen((prev) => !prev)

    }

    return (
        <div>

            {props.open &&
                <div className="createAccount">
                    <div className="container">
                        <div className='login'>
                            <h2 >Please Login To Continue</h2>
                            <img src="./close.png" className="close" alt="" onClick={props.handleOnClick} />
                            <div style={{ backgroundColor: "white" }} className="item">
                                <div className="btn">
                                    <button onClick={handleOnChange} style={{ backgroundColor: change && "white" || "rgb(239, 241, 243)", borderTop: change && "3px solid #fa538d" || "3px solid rgb(239, 241, 243)" }} className="signIn">Sign In</button>
                                    <button onClick={handleOnChange} style={{ backgroundColor: change && "rgb(239, 241, 243)" || "white", borderTop: change && "3px solid rgb(239, 241, 243)" || "3px solid #fa538d" }} className="signUp">Sign Up</button>
                                </div>
                                {
                                    open && <Register handleOnChange={handleOnChange}/> 
                                }
                                {
                                    !open && <Login handleOnClick={props.handleOnClick} />
                                }
                            </div>

                        </div>
                    </div>
                </div>

            }

        </div>
    )
}

export default CreateAccount
