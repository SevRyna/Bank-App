import  Grid from "../../component/grid";
import  FieldForm1 from "../../component/field1-form";
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
          const res = await fetch("http://localhost:4000/recovery", {
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
                email: value.email,
                password: value.password,
              });
        return value;
      };

  return (
    <div className="container">

    <Menu
      back={ <BackButton 
        to="/signup"
         />}
      />        
      <Heading 
        title="Recovery password"
        info="Choose a recovery method"
      />

        <div className="login-form">
                <Grid>
      <FieldForm1
        name1="Email"
        placeholder1="input email, please"
        button="Send code"
        onSubmit={handleSubmit}
      />
      {status === LOAD_STATUS.ERROR && (
        <Alert status={status} message={message} />
      )}
      {status === LOAD_STATUS.PROGRESS && <Loader />}
      {status === LOAD_STATUS.SUCCESS &&
           window.location.assign('/recovery-confirm/')
      }
    </Grid>
        </div>    
        <img src="HomeIndicator.png" class="h-i"  alt="cam"/>
    </div>
  );    
}
