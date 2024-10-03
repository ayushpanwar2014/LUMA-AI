import { useState } from 'react';
import './App.css'
import Demo from './components/Chat/demo'
import Navbar from './components/Navbar/Navbar'
import CreateAccount from './components/CreateAccount/CreateAccount'
import Notification from './components/Notification/Notification'

function App() {

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(false);

  const handleOnClick = () => {

    setOpen((prev) => !prev)
    if (open === true && mode === false) {
      document.body.style.backgroundColor = 'white';
      
    }
    else if(open === false  && mode === false){
      document.body.style.color = 'white';
      document.body.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
    }

}

const handleMode = () => {

  if (mode) {

      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";

  }
  else {
      document.body.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
      document.body.style.color = "white";
  }

  setMode((prev) => !prev);
}

  return (
    <>

    <Navbar mode={mode} handleMode={handleMode} handleOnClick={handleOnClick}/>

    { open ? 
      (<CreateAccount  handleOnClick={handleOnClick} open={open}/>)
       :   
      (<Demo mode={mode} open={open}/>)
    }

    <Notification/>

    </>

  )
}

export default App
