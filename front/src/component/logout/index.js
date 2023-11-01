import Button from "../../component/button";
import { Alert, Loader, LOAD_STATUS } from "../../component/load";
import { useState } from "react";
import { saveSession } from '../../script/session';
//----------------------------------------------------------------up
import "./index.css";

export default function DataLogout(email) {
  // ----------------------------------------down
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = (value) => {
    // console.log('sended value=', value);
    return sendData({ value });
  };

  const sendData = async (dataToSend) => {
    setStatus(LOAD_STATUS.PROGRESS);

    try {
      const res = await fetch("http://localhost:4000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: convertData(dataToSend),
        // body: dataToSend.value,
      });
      console.log('body=', convertData(dataToSend));
      // console.log('body=', dataToSend.value);

      const data = await res.json();

      if (res.ok) {
        // setStatus(null);
        setStatus(LOAD_STATUS.SUCCESS);
        // if (onCreate) onCreate();
        // console.log('res=',res)
        // console.log('data=',data)       
        // current-email
        setMessage(data.message);
        localStorage.setItem('email', '');
        document.addEventListener('DOMContentLoaded', () => {
          saveSession(null)        
          // location.assign('/')
        })        
        // const cur = document.getElementsByClassName('current-email');
        // cur[0].textContent = data.email;  
        // localStorage.setItem("email",data.email);      
      } else {
        setMessage(data.message);
        setStatus(LOAD_STATUS.ERROR);
      }
    } catch (error) {
      setMessage(error.message);
      setStatus(LOAD_STATUS.ERROR);
    }
  };
  const convertData = ({ value }) => {
    console.log('convert value=', value);
    // console.log('convert email=', value.email);
    value = JSON.stringify({
      email: email.email,
    });
    return value;
  };
 
    // ----------------------------------------down

  // -----------------------------------------------------------------------up

  return (
    <div className="logout">
      {/* <h2>Logout</h2> */}
      <div className="logout-form">
        {/* <buton 
          name="logout!"
          text="Log out" 
          type="button"
          onClick={handleSubmit}        
        /> */}
      
        {/* <button onClick={handleSubmit}>Log out</button> */}
        <Button 
          onClick={handleSubmit}
          text= "Log out"
        />
        {status === LOAD_STATUS.ERROR && (
          <Alert status={status} message={message} />
        )}
        {status === LOAD_STATUS.PROGRESS && <Loader />}
        {status === LOAD_STATUS.SUCCESS && 
          <Alert status={status} message={message} />
        }
      </div>
      {/* ---------------------- */}
    </div>
  );
}

// export default DataLogout;