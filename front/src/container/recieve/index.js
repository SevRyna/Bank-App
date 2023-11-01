import Grid from "../../component/grid";
import FieldForm12B from "../../component/field1-2button";
// import  FieldForm12B from "../../component/field1-form";
import { Alert, Loader, LOAD_STATUS } from "../../component/load";
import { useState } from "react";
import BackButton from "../../component/back-button";
import Menu from "../../component/menu";
import Heading from "../../component/heading";
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
    // console.log('sended value=', value);
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
    console.log('convert value=', value);
    // console.log('convert email=', value.email);
    value = JSON.stringify({
      emails: value.paySystem,
      emailr: localStorage.getItem("email"),
      sum: value.sum,
      // op_id: 1,
    });
    return value;
  };
  // -----------------------------------------------------------------------up
  const userEmail = localStorage.getItem("email");

  return (
    <div className="container receive">
      <Menu back={<BackButton to="/balance" />} />
      {/* <h1>Receive</h1> */}
      <Heading title="Receive" />
      <div className="login-form">
        {/* -------------------------------------down */}
        {/* <Grid> */}
          {/* <label>{userEmail}</label> */}
          <div class="email-st">{userEmail}</div>
          <FieldForm12B
            // name1="Email"
            name="Receive amount"
            nameButs="Payment system"
            // placeholder1="input Email, please"
            placeholder="input Sum, please"
            button1="Stripe"
            button2="Coinbase"
            onSubmit={handleSubmit}
            // onSubmit={renderBalance}
          />
          {status === LOAD_STATUS.ERROR && (
            <Alert status={status} message={message} />
          )}
          {status === LOAD_STATUS.PROGRESS && (
            //  window.open("http://localhost:3000/balance/")
            <Loader />
          )}
          {status === LOAD_STATUS.SUCCESS && (
            // <Alert status={status} message="Ok" />
            // window.location.assign('/balance/')
            <Alert status={status} message="Ok" />
          )}
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
