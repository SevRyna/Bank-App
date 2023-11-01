import "./index.css";

export default function Component({ name, classname, type, label,  placeholder }) {

  return (
        <div>
          <div className={classname}>
              <label htmlFor={name} className="field__label">{label}</label>
              {/* <input onInput={action} type={type} className="field__input validation"  name={name}  */}
              <input type={type} className="field__input validation"  name={name} 
                placeholder={placeholder} />
          </div>
          {/* <span name="email" class="form__error">Помилка field</span> */}
        </div>
  );
};
