import  Grid from "../../component/grid";
import  FieldForm2 from "../../component/field2-form";
import { Alert, Loader, LOAD_STATUS } from "../../component/load";
import { useState } from "react";
import  BackButton from "../../component/back-button";
import  Menu from "../../component/menu";
import  Heading from "../../component/heading";
import "./index.css";

export default function Component() {
const [status, setStatus] = useState(null);
const [message, setMessage] = useState("");

    const handleSubmit = (value) => {
        return sendData({ value });
      };
    
      const sendData = async (dataToSend) => {
        setStatus(LOAD_STATUS.PROGRESS);
            
        try {
          const res = await fetch("http://localhost:4000/recovery-confirm", {
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
                code: value.email,
                password: value.password,
              });
        return value;
      };
  return (
    <div className="container recovery">

    <Menu
      back={ <BackButton 
        to="/signup"
         />}
      />        
            <Heading 
                title="Recovery password"
                info="Write the code you recieved"
            />
        <div className="login-form">
                <Grid>
      <FieldForm2
        name1="Code"
        name2="New password"      
        placeholder1="input code, please"
        placeholder2="input new password, please"
        type1="email"
        type2="password"        
        button="Restore password"
        onSubmit={handleSubmit}
      />
      {status === LOAD_STATUS.ERROR && (
        <Alert status={status} message={message} />
      )}
      {status === LOAD_STATUS.PROGRESS && <Loader />}
      {status === LOAD_STATUS.SUCCESS &&
           window.location.assign('/signin/')
      }
    </Grid>
        </div>       
        <img src="HomeIndicator.png" class="h-i"  alt="cam"/>
    </div>
  );    
}
