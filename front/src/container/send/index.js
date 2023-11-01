import  Grid from "../../component/grid";
// import { Link, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import  FieldForm2 from "../../component/field2-form";
// import  Balance from "../../component/balance";
import { Alert, Loader, LOAD_STATUS } from "../../component/load";
import { useState } from "react";
import  BackButton from "../../component/back-button";
import  Menu from "../../component/menu";
import  Heading from "../../component/heading";
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

//--------------------------
    

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
            // body: dataToSend.value,
          });
          // console.log('body=', convertData(dataToSend));
          // console.log('body=', dataToSend.value);
    
          const data = await res.json();
    
          if (res.ok) {
            // setStatus(null);
            setStatus(LOAD_STATUS.SUCCESS);
            // if (onCreate) onCreate();
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
        // console.log('convert value=', value);
        // console.log('convert email=', value.email);
           value = JSON.stringify({
                // email: value.email,
                // sum: value.password,
                // op_id: 2,
                emails: localStorage.getItem("email"),
                emailr: value.email,
                sum: value.password,
              });
              console.log('convert value=', value);
        return value;
      }  
// -----------------------------------------------------------------------up
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
{/* -------------------------------------down */}
                {/* <Grid> */}
                <div class="email-st">{userEmail}</div>
      <FieldForm2
        name1="Email"
        name2="Sum"      
        placeholder1="input Email, please"
        placeholder2="input Sum, please"
        type1="email"
        // type2="number"
        button="Send"
        onSubmit={handleSubmit}
        // onSubmit={renderBalance}
      />
      {status === LOAD_STATUS.ERROR && (
        <Alert status={status} message={message} />
      )}
      {status === LOAD_STATUS.PROGRESS &&
          //  window.open("http://localhost:3000/balance/")
      <Loader />
      }
      {status === LOAD_STATUS.SUCCESS &&  
        // <Alert status={status} message="Ok" />        
        // window.location.assign('/balance/')
        <Alert status={status} message="Ok" />
        // <div>
        // <label htmlFor="send-button" className="send-label" >Send</label>
        // <Link className="balanceLink" to="/balance">
        // </Link>  
        // </div>            
       }
    {/* <div className="buttons ref-to-balance">
        <Link className="App-link" to="/balance">
          Sign in
        </Link>    
      </div>       */}
    {/* </Grid> */}
{/* -------------------------------------up */}                 
            {/* </form> */}
        </div>     
    </div>
  );    
}
