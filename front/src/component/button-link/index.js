import "./index.css";
import { Link } from 'react-router-dom';

export default function Component({ classname, id, label, text, to }) {
  return (
        <div>
          <div className={classname}>
              <label htmlFor={id} >{label}</label>
              <Link className="App-link-ref" id={id} to={to}>
              {text}
              </Link>                
          </div>
          {/* <span name="email" class="form__error">Помилка field</span> */}
        </div>
  );
};
