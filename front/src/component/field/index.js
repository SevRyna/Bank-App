import "./index.css";

export default function Component({ name, classname, type, label,  placeholder }) {

  return (
        <div>
          <div className={classname}>
              <label htmlFor={name} className="field__label">{label}</label>  
              <input type={type} className="field__input validation"  name={name} 
                placeholder={placeholder} />
          </div>
        </div>
  );
};
