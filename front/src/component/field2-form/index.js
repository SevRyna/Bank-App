import { useState } from "react";
import "./index.css";

export default function Component({ name1, name2, placeholder1, placeholder2, type1, type2, button, onSubmit, buttonLink }) {
  const [email, setValue1] = useState("");
  const [password, setValue2] = useState("");
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
  // console.log('type1=', type1);
  const [passwordType1, setPasswordType1] = useState(type1);
  const eye1Click = () => {
    setPasswordType1(!passwordType1)
  }  
  const [passwordType, setPasswordType] = useState(type2);
  const eyeClick = () => {
      setPasswordType(!passwordType)
  }
  let type1p = null;
  if(type1 === 'password'){
    type1p = true;
  }
  return (

    <div className="field-form myform">
      <label>{name1}</label>
      <input
        onChange={handleChange1}
        value={email}
        rows={1}
        placeholder={placeholder1}
        // type={type1}
        type={passwordType1 && type1p ? 'password' : {type1}}
        className="field-form__field"
      ></input>      
 {{type1} && type1p && 
      <input type="image" onClick={eye1Click} name="eye" 
      src={passwordType1 ? '/png/eye.png' : '/png/Hide.png'}
      className={passwordType1 ? 'eye fas fa-eye-slash' : 'eye fas fa-eye'}
      width="24" height="24" alt="eye" />
    }

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
      ></input> 
      {{type2} && 
      <input type="image" onClick={eyeClick} name="eye" 
      src={passwordType ? '/png/eye.png' : '/png/Hide.png'}
      className={passwordType ? 'eye fas fa-eye-slash' : 'eye fas fa-eye'}
      width="24" height="24" alt="eye" />
    }
      </div>
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
