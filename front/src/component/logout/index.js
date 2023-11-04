import Button from "../../component/button";
import { Alert, Loader, LOAD_STATUS } from "../../component/load";
import { useState } from "react";
import { saveSession } from '../../script/session';
import "./index.css";

export default function DataLogout(email) {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = (value) => {
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
      });
      console.log('body=', convertData(dataToSend));
      const data = await res.json();

      if (res.ok) {
        setStatus(LOAD_STATUS.SUCCESS);
        setMessage(data.message);
        localStorage.setItem('email', '');
        document.addEventListener('DOMContentLoaded', () => {
          saveSession(null)   
        })     
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
    value = JSON.stringify({
      email: email.email,
    });
    return value;
  };
  return (
    <div className="logout">
      <div className="logout-form">
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
    </div>
  );
}
