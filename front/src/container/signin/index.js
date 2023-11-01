import  Grid from "../../component/grid";
import  Buttonlink from "../../component/button-link";
import  BackButton from "../../component/back-button";
import  Menu from "../../component/menu";
import  FieldForm2 from "../../component/field2-form";
import  Hedding from "../../component/heading";
import { Alert, Loader, LOAD_STATUS } from "../../component/load";
import { useState } from "react";
//----------------------------------------------------------------up
import "./index.css";
// import { Link } from 'react-router-dom';
// import  Field from "../../component/field";
// import  Buttonlink from "../../component/button-link";

export default function Component() {
// ----------------------------------------down
const [status, setStatus] = useState(null);
const [message, setMessage] = useState("");
//--------------------------

    const handleSubmit = (value) => {
       localStorage.setItem("email", value.email);
       console.log('sended value=', value);
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
            // body: dataToSend.value,
          });
          // console.log('body=', convertData(dataToSend));
          // console.log('body=', dataToSend.value);
    
          const data = await res.json();
    
          console.log('data=',data)

          if (res.ok) {
            // setStatus(null);
            setStatus(LOAD_STATUS.SUCCESS);
            // if (onCreate) onCreate();
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
        // console.log('convert value=', value);
        // console.log('convert email=', value.email);
           value = JSON.stringify({
                email: value.email,
                password: value.password,
              });
        return value;
      };
// -----------------------------------------------------------------------up

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
{/* -------------------------------------down */}
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
        // onSubmit={renderBalance}
      />
      {status === LOAD_STATUS.ERROR && (
        <Alert status={status} message={message} />
      )}
      {status === LOAD_STATUS.PROGRESS && <Loader />}
      {status === LOAD_STATUS.SUCCESS &&
           window.location.assign('/balance/')
          // <Loader /> 
      }
    </Grid>
{/* -------------------------------------up */}                 
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