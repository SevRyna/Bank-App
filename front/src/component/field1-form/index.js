import { useState } from "react";
// import  Field from "../../component/field";
// import  Buttonlink from "../../component/button-link";
import "./index.css";

export default function Component({ name1, placeholder1, button, onSubmit }) {
  const [email, setValue1] = useState("");
  // const value = {email, password};

  const handleChange1 = (e) => setValue1(e.target.value);

  const handleSubmit = () => {
    if (email.length === 0) return null;

    if (onSubmit) {
      const value = {email};
      onSubmit(value);
    } else {
      throw new Error("onSubmit props is undefined");
    }

    setValue1("");
  };

  const isDisabled1 = email.length === 0;

  return (
    

    <div className="field-form myform">
      <label>{name1}</label>
      <textarea
        onChange={handleChange1}
        value={email}
        rows={1}
        placeholder={placeholder1}
        className="field-form__field"
      ></textarea>
      
      <button
        disabled={isDisabled1}
        onClick={handleSubmit}
        className="field-form__button"
      >
        {button}
      </button>
    </div>
  );
}
