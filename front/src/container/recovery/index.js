import  Grid from "../../component/grid";
import  FieldForm1 from "../../component/field1-form";
import { Alert, Loader, LOAD_STATUS } from "../../component/load";
import { useState } from "react";
import  BackButton from "../../component/back-button";
import  Menu from "../../component/menu";
import  Heading from "../../component/heading";
//----------------------------------------------------------------up
import "./index.css";

export default function Component() {
// ----------------------------------------down
const [status, setStatus] = useState(null);
const [message, setMessage] = useState("");
//--------------------------

    const handleSubmit = (value) => {
        // console.log('sended value=', value);
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
                email: value.email,
                password: value.password,
              });
        return value;
      };
// -----------------------------------------------------------------------up

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
{/* -------------------------------------down */}
                <Grid>
      <FieldForm1
        name1="Email"
        // name2="Password"      
        placeholder1="input email, please"
        // placeholder2="input password, please"
        button="Send code"
        onSubmit={handleSubmit}
        // onSubmit={renderBalance}
      />
      {status === LOAD_STATUS.ERROR && (
        <Alert status={status} message={message} />
      )}
      {status === LOAD_STATUS.PROGRESS && <Loader />}
      {status === LOAD_STATUS.SUCCESS &&
           window.location.assign('/recovery-confirm/')
      // <Loader />
      }
    </Grid>
{/* -------------------------------------up */}                 
            {/* </form> */}
        </div>    
        <img src="HomeIndicator.png" class="h-i"  alt="cam"/>
    </div>
  );
    
}