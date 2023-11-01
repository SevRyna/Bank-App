import { useState } from "react";
// import  Field from "../../component/field";
// import  Buttonlink from "../../component/button-link";
// import  Button from "../../component/button";
import "./index.css";

export default function Component({ name1, name2, placeholder1, placeholder2, type1, type2, button, onSubmit, buttonLink }) {
  const [email, setValue1] = useState("");
  const [password, setValue2] = useState("");
  // const value = {email, password};

  const handleChange1 = (e) => setValue1(e.target.value);
  const handleChange2 = (e) => setValue2(e.target.value);

  const handleSubmit = () => {
    if (email.length === 0) return null;
    if (password.length === 0) return null;

    if (onSubmit) {
      const value = {email, password};
      onSubmit(value);
    } else {
      throw new Error("onSubmit props is undefined");
    }

    setValue1("");
    setValue2("");
  };

  const isDisabled1 = email.length === 0;
  const isDisabled2 = password.length === 0;
  // const isButtonLink = buttonLink.length !== 0;
  // const isButtonLink = buttonLink.length !== 0;
  // const isButtonLink = buttonLink !== 0;
  const [passwordType, setPasswordType] = useState("button");
  const eyeClick = () => {
      setPasswordType(!passwordType)
  }
//  const userEmail = localStorage.getItem("email")

  // console.log('type2=', type2);
  return (
    

    <div className="field-form myform">
      {/* <label>{userEmail}</label> */}
      <label>{name1}</label>
      <input
        onChange={handleChange1}
        value={email}
        rows={1}
        placeholder={placeholder1}
        type={type1}
        className="field-form__field"
      ></input>      
      
      <label>{name2}</label>
      <div class="eye-container">
      <input
        onChange={handleChange2}
        value={password}
        rows={1}
        placeholder={placeholder2}
        // type={type2}
        type={passwordType ? 'password' : 'text'}
        className="field-form__field"
        // className={!passwordType ? 'field-form__field fas fa-eye-slash' : 'field-form__field fas fa-eye'}
        // type="number"
      ></input> 
      {{type2} && 
      // <img  src="/png/eye.png" class="eye" alt="eye" width="24" height="24" /> 
      <input type="image" onClick={eyeClick} name="eye" 
      src={passwordType ? '/png/eye.png' : '/png/Hide.png'}
      className={passwordType ? 'eye fas fa-eye-slash' : 'eye fas fa-eye'}
      width="24" height="24" />
    }
      </div>
      {/* if (isButtonLink) 
        <Buttonlink
                classname = buttonLink.classname
                id = "ref-signin"
                label = "Forgot you password?"
                text = "Already have an account?"
                to = "/signin"
        /> */}
      <button
        disabled={isDisabled1 || isDisabled2}
        onClick={handleSubmit}
        className="field-form__button"
      >
        {button}
      </button>
    </div>
  );
}
