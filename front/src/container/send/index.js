import  FieldForm2 from "../../component/field2-form";
import { Alert, Loader, LOAD_STATUS } from "../../component/load";
import { useState } from "react";
import  BackButton from "../../component/back-button";
import  Menu from "../../component/menu";
import "./index.css";

export default function Component() {
const [status, setStatus] = useState(null);
const [message, setMessage] = useState("");

    const handleSubmit = (value) => {
        console.log('receive value=', value);
        return sendData({ value });
      };
    
      const sendData = async (dataToSend) => {
        setStatus(LOAD_STATUS.PROGRESS);
            
        try {
          const res = await fetch("http://localhost:4000/operation", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: convertData(dataToSend),
          });
    
          const data = await res.json();
    
          if (res.ok) {
            setStatus(LOAD_STATUS.SUCCESS);
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
           value = JSON.stringify({
                emails: localStorage.getItem("email"),
                emailr: value.email,
                sum: value.password,
              });
              console.log('convert value=', value);
        return value;
      }  
const userEmail = localStorage.getItem("email");
  return (
    <div className="container sender">

      <Menu
        back={ <BackButton 
          to="/balance"
           />}
        />        
                <h1>Send</h1>
        <div className="login-form">
                <div class="email-st">{userEmail}</div>
      <FieldForm2
        name1="Email"
        name2="Sum"      
        placeholder1="input Email, please"
        placeholder2="input Sum, please"
        type1="email"
        button="Send"
        onSubmit={handleSubmit}
      />
      {status === LOAD_STATUS.ERROR && (
        <Alert status={status} message={message} />
      )}
      {status === LOAD_STATUS.PROGRESS &&
      <Loader />
      }
      {status === LOAD_STATUS.SUCCESS &&  
        <Alert status={status} message="Ok" />
       }
        </div>     
    </div>
  );    
}
