import  Grid from "../../component/grid";
import  Buttonlink from "../../component/button-link";
import  BackButton from "../../component/back-button";
import  Menu from "../../component/menu";
import  FieldForm2 from "../../component/field2-form";
import  Hedding from "../../component/heading";
import { Alert, Loader, LOAD_STATUS } from "../../component/load";
import { useState } from "react";
import "./index.css";

export default function Component() {
const [status, setStatus] = useState(null);
const [message, setMessage] = useState("");
//--------------------------

    const handleSubmit = (value) => {
       localStorage.setItem("email", value.email);
      //  console.log('sended value=', value);
        return sendData({ value });
      };
    
      const sendData = async (dataToSend) => {
        setStatus(LOAD_STATUS.PROGRESS);
            
        try {          
          const res = await fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: convertData(dataToSend),
          });
    
          const data = await res.json();
    
          // console.log('data=',data)

          if (res.ok) {
            setStatus(LOAD_STATUS.SUCCESS);
          } else {
            localStorage.setItem("email", "");
            setMessage(data.message);
            setStatus(LOAD_STATUS.ERROR);
          }
        } catch (error) {
          localStorage.setItem("email", "");
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
    <div className="container signin">

    <Menu
      back={ <BackButton 
        to="/"
         />}
      />        

        <Hedding
          title="Sign in"
          info="Select login method"
        />
        <div className="login-form">
                <Grid>
      <FieldForm2
        name1="Email"
        name2="Password"      
        placeholder1="input email, please"
        placeholder2="input password, please"
        button="Continue"
        type1="email"
        type2="password"
        onSubmit={handleSubmit}
      />
      {status === LOAD_STATUS.ERROR && (
        <Alert status={status} message={message} />
      )}
      {status === LOAD_STATUS.PROGRESS && <Loader />}
      {status === LOAD_STATUS.SUCCESS &&
           window.location.assign('/balance/')
      }
    </Grid>     
        <form id="login-form" method="POST" action="/signup">
                  <Buttonlink
                          classname="buttons"                        
                          id="ref-signin"
                          label="Forgot you password?"
                          text="Restore"
                          to="/recovery"
                      />
              </form>  
        </div> 
        <img src="HomeIndicator.png" class="h-i"  alt="cam"/>
    </div>
  );    
}
