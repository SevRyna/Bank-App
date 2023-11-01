import "./index.css";
// import { Link } from 'react-router-dom';

export default function Component({ classname,type,  id, text, onClick }) {
  return (
        <div class="buttonComp">
                <div className={classname} >
                    <button type={type} id={id} onClick={onClick}>{text}</button>
                </div>
        </div>
  );
};
