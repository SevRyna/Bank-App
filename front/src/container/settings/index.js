import FieldForm2 from "../../component/field2-form";
import BackButton from "../../component/back-button";
import { Link } from 'react-router-dom';
import Menu from "../../component/menu";
import { Alert, Loader, LOAD_STATUS } from "../../component/load";
import { useState } from "react";
// import { saveSession } from '../../script/session';
import DataLogout  from '../../component/logout';
//----------------------------------------------------------------up
import "./index.css";

export default function Component() {
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
      const res = await fetch("http://localhost:4000/change-email", {
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
        console.log('res=',res)
        console.log('data=',data)       
        // current-email
        setMessage(data.message);
        const cur = document.getElementsByClassName('current-email');
        cur[0].textContent = data.email;  
        localStorage.setItem("email",data.email);      
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
      email: localStorage.getItem("email"),
      newEmail: value.email,
      // email: value.email,
      password: value.password,
    });
    return value;
  };
 
    // ----------------------------------------down
    const [status2, setStatus2] = useState(null);
    const [message2, setMessage2] = useState("");
  
    const handleSubmit2 = (value) => {
      // console.log('sended value=', value);
      return sendData2({ value });
    };
  
    const sendData2 = async (dataToSend) => {
      setStatus2(LOAD_STATUS.PROGRESS);
  
      try {
        const res = await fetch("http://localhost:4000/change-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: convertData2(dataToSend),
          // body: dataToSend.value,
        });
        // console.log('body=', convertData(dataToSend));
        // console.log('body=', dataToSend.value);
  
        const data = await res.json();
  
        if (res.ok) {
          // setStatus(null);
         setMessage2(data.message);
          console.log('res=',res)
          console.log('data=',data)
          setStatus2(LOAD_STATUS.SUCCESS);
          // if (onCreate) onCreate();
        } else {
          setMessage2(data.message);
          setStatus2(LOAD_STATUS.ERROR);
        }
      } catch (error) {
        setMessage2(error.message);
        setStatus2(LOAD_STATUS.ERROR);
      }
    };
    const convertData2 = ({ value }) => {
      // console.log('convert value=', value);
      // console.log('convert email=', value.email);
      value = JSON.stringify({
        email: localStorage.getItem("email"),
        oldPassword: value.email,
        newPassword: value.password,
      });
      return value;
    };

  // -----------------------------------------------------------------------up

  return (
    <div className="container settings">
      <Menu back={<BackButton to="/balance" />} />
      <h2>Settings</h2>
      <h3>Change email</h3>      
      <div className="setting-form signup">
        <div className="current-email">{localStorage.getItem("email")}</div>
        <FieldForm2
          name1="Email"
          name2="Old Password"
          placeholder1="input new email, please"
          placeholder2="input old password, please"
          type1="email"
          type2="password"
          button="Save Email"
          onSubmit={handleSubmit}
          // buttonLink = {buttonLink}
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
      <ul />
      <h3>Change password</h3>
      <div className="setting-form signup" >
        <FieldForm2
          name1="Old password"
          name2="New Password"
          placeholder1="input old password, please"
          placeholder2="input new password, please"  
          type1="password"
          type2="password"
          button="Save Password"
          onSubmit={handleSubmit2}
          // buttonLink = {buttonLink}
        />
        {status2 === LOAD_STATUS.ERROR && (
          <Alert status={status2} message={message2} />
        )}
        {status2 === LOAD_STATUS.PROGRESS && <Loader />}
        {status2 === LOAD_STATUS.SUCCESS && 
            <Alert status={status2} message={message2} />
        }
          {/* window.location.assign("/signup-confirm/")} */}
      </div>     

      <div className="buttons">
        {/* <Link className="App-link" to="/">
          Log out
        </Link> */}
        < DataLogout 
            email= {localStorage.getItem("email")}
        />
      </div>
    </div>
  );
}
