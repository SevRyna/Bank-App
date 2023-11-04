import  Grid from "../../component/grid";
import  FieldForm1 from "../../component/field1-form";
import  Menu from "../../component/menu";
import  ButtonLink from "../../component/button-link";
import  Heading from "../../component/heading";
import  BackButton from "../../component/back-button";
import { Alert, Loader, LOAD_STATUS } from "../../component/load";
import { useState } from "react";
// import { Link } from 'react-router-dom';
import "./index.css";
export default function Component() {
const [status, setStatus] = useState(null);
const [message, setMessage] = useState("");
//--------------------------

    const handleSubmit = (value) => {
      // console.log('value1=', value);
        return sendData({ value });
      };
    
      const sendData = async (dataToSend) => {
        setStatus(LOAD_STATUS.PROGRESS);
            // console.log('dataToSend=', dataToSend)
        try {
          const res = await fetch("http://localhost:4000/signup-confirm", {
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
        // console.log('convert1 value=', value);
        // console.log('convert2 email=', localStorage.getItem('email'));
           value = JSON.stringify({
                code: value.email,
                email: localStorage.getItem('email'),
              });
              // console.log('value2=', value);
        return value;
      };

  return (
    <div className="container signup-confirm">

      <Menu
        back={ <BackButton 
          to="/signup"
           />}
        />      
        <Heading
          title="Confirm account"
          info="Write the code you recieved"
        />
        <div className="login-form">
                <Grid>
      <FieldForm1
        name1="Code"
        placeholder1="input code, please"
        button="Confirm"
        onSubmit={handleSubmit}
      />
      {status === LOAD_STATUS.ERROR && (
        <Alert status={status} message={message} />
      )}
      {status === LOAD_STATUS.PROGRESS && <Loader />}
      {status === LOAD_STATUS.SUCCESS &&
          //  window.location.assign('/signin/')
          <ButtonLink
               classname= "field-form__button"
               id = 'signin-go'
               label = ""
               text = "Пререйти на сторінку реєстрації"
               to = "/signin"
          />
          // <div>
          //   <label htmlFor="signin-go" className="recieve-label" >Recieve</label>
          //   <Link id="signin-go" className="recieve" to="/signin">
          //   </Link> 
          // </div>
      }
    </Grid>
        </div>   
        <img src="HomeIndicator.png" className="h-i"  alt="cam"/>
    </div>
  );    
}
