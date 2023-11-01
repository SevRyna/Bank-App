// import "./index.css";

export default function Component({ name, label, action, value, placeholder }) {
  return (
    <div className="field field--password">
      <label for={name} className="field__label">{label}</label>

      <div className="field__wrapper">
        <input oninput="{action}(this.name, this.value)" type="password" className="field__input validation"
          name={name} value={value} placeholder={placeholder} />
        <span onclick="fieldPassword.toggle(this)" className="field__icon"></span>
      </div>
      <span name="password" className="form__error">Помилка field-password</span>
      FIELD-PASSW---------
    </div>   
  );
};
