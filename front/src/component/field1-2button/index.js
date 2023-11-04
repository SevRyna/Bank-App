import { useState } from "react";
import "./index.css";

export default function Component({ name, nameButs, placeholder, button1, button2, onSubmit }) {
  const [sum, setValue1] = useState("");

  const handleChange1 = (e) => setValue1(e.target.value);

  const handleSubmit1 = () => {
    if (sum.length === 0) return null;

    if (onSubmit) {
      const value = {sum,paySystem: button1};
      onSubmit(value);
    } else {
      throw new Error("onSubmit props is undefined");
    }

    setValue1("");
  };
  const handleSubmit2 = () => {
    if (sum.length === 0) return null;

    if (onSubmit) {
      const value = {sum,paySystem: button2};
      onSubmit(value);
    } else {
      throw new Error("onSubmit props is undefined");
    }

    setValue1("");
  };

  const isDisabled = sum.length === 0;

  return (    

    <div className="field-form myform">
      <label>{name}</label>
      <textarea
        onChange={handleChange1}
        value={sum}
        rows={1}
        placeholder={placeholder}
        className="field-form__field"
      ></textarea>
      
      <div class="nameButs" >{nameButs}</div>
      <button 
        className="buttonDecor"
        disabled={isDisabled}
        onClick={handleSubmit1}
      >
        <img src="png/S.png" alt={button1} />        
        <div class="center-butD">{button1} </div>      
        <img src="small-svg/frame539.svg" class="right_butD" alt={button1} />        
      </button>

      <button 
        className="buttonDecor"
        disabled={isDisabled}
        onClick={handleSubmit2}
      >
        <div class="left_butD"><img src="png/C.png"  alt={button2} /> </div>               
        <div class="center-butD">{button2} </div>  
        <div class="right_butD"><img src="small-svg/frame537.svg"  alt={button2} /></div>              
      </button>      

    </div>
  );
}
