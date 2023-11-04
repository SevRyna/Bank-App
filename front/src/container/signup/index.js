import FieldForm2 from "../../component/field2-form";
import Buttonlink from "../../component/button-link";
import BackButton from "../../component/back-button";
import Menu from "../../component/menu";
import Heading from "../../component/heading";
import { Alert, Loader, LOAD_STATUS } from "../../component/load";
import { useState } from "react";
import "./index.css";

export default function Component() {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = (value) => {
    localStorage.setItem("email", value.email);
    return sendData({ value });
  };

  const sendData = async (dataToSend) => {
    setStatus(LOAD_STATUS.PROGRESS);

    try {
      const res = await fetch("http://localhost:4000/signup", {
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
    <div className="container signup">
      <Menu back={<BackButton to="/" />} />
      <Heading 
        title="Sign up"
        info="Choose a registration method"
      />
      <div className="login-form signup">
        <FieldForm2
          name1="Email"
          name2="Password"
          placeholder1="input email, please"
          placeholder2="input password, please"
          type1="email"
          type2="password"
          button="Continue"
          onSubmit={handleSubmit}
        />
        {status === LOAD_STATUS.ERROR && (
          <Alert status={status} message={message} />
        )}
        {status === LOAD_STATUS.PROGRESS && <Loader />}
        {status === LOAD_STATUS.SUCCESS &&
          window.location.assign("/signup-confirm/")}

        <form id="login-form" method="POST" action="/signup">
          <Buttonlink
            classname="button"
            id="ref-signin"
            label="Already have an account?"
            text="Sign in"
            to="/signin"
          />
        </form>
      </div>
      <img src="HomeIndicator.png" class="h-i"  alt="cam"/>
    </div>
  );
}
