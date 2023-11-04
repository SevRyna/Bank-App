import FieldForm12B from "../../component/field1-2button";
import { Alert, Loader, LOAD_STATUS } from "../../component/load";
import { useState } from "react";
import BackButton from "../../component/back-button";
import Menu from "../../component/menu";
import Heading from "../../component/heading";
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
    console.log('convert value=', value);
    value = JSON.stringify({
      emails: value.paySystem,
      emailr: localStorage.getItem("email"),
      sum: value.sum,
    });
    return value;
  };
  const userEmail = localStorage.getItem("email");

  return (
    <div className="container receive">
      <Menu back={<BackButton to="/balance" />} />
      <Heading title="Receive" />
      <div className="login-form">
          <div class="email-st">{userEmail}</div>
          <FieldForm12B
            name="Receive amount"
            nameButs="Payment system"
            placeholder="input Sum, please"
            button1="Stripe"
            button2="Coinbase"
            onSubmit={handleSubmit}
          />
          {status === LOAD_STATUS.ERROR && (
            <Alert status={status} message={message} />
          )}
          {status === LOAD_STATUS.PROGRESS && (
            <Loader />
          )}
          {status === LOAD_STATUS.SUCCESS && (
            <Alert status={status} message="Ok" />
          )}
      </div>
      <img src="HomeIndicator.png" class="h-i"  alt="cam"/>
    </div>
  );
}
