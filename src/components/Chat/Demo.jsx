import React from 'react'
import { useState } from 'react'
import './Demo.css'
import axios from 'axios';


const Demo = (props) => {

  const [question, setQuestion] = useState("");
  const [answere, setAnswere] = useState(<p>How can I help you today?</p>);

  const handleSend = async() => {


    setAnswere("");
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDVdnPxfPfhnshwO0n8b-kfPbLfV0dOumo`,
      method: "post",
      data: {
        contents: [
          { parts: [{ text: question}]},
        ],
      },
    });

    let ans = response["data"]["candidates"][0]["content"]["parts"][0]["text"];

    ans = ans.replace(/\*/g, `\n`)
    ans = ans.replace(/\#/g, `\n`)

    setAnswere(<p> {ans} </p>);
  }

  return (
    <>
    <div className="chats">

      <p  className='summary' style={{color : props.mode ? "white" : "black"}}> <mark className="border-line">Luma-AI</mark>I’m an AI designed to assist, inform, and engage in conversation on a wide range of topics!</p>
      <div className='container'>
        <div className='chat'>
          <div className="top">
            <div className="user">
              <div className="texts">
                <span>Luma-AI This Side</span>
              </div>
            </div>
          </div>

          <div className="center">

            <div className="message" >
              <div className="texts">
             {
                answere == "" ? 
               <img height={"70px"} width={"700px"}  style={{objectFit: "contain"}} src="https://media.tenor.com/mT5Timqns1sAAAAi/loading-dots-bouncing-dots.gif"  alt="" />
               : answere
             }
              </div>
            </div>

          </div>

          
          <div className="bottom">
            <input style={{color: props.mode ? "white" : "black"}} type="text" value={question} onChange={e => setQuestion(e.target.value)} className='type' placeholder="Type over here..." />
            <button onClick={handleSend} className='sendButton' >Send</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Demo
