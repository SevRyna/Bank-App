import "./index.css";
// import { Link } from 'react-router-dom';

export default function Component({ disabled,  id, handleSubmit, text, icon, sozicon }) {
  return (
        // <div class="buttonComp">
                <div className="buttonDecor" >
                    <button 
                      disabled={disabled} 
                      id={id}>
                      onClick={handleSubmit}
                      <img src={icon} alt={text} />
                      {text}
                      <img src={sozicon} alt={text} />
                    </button>
                </div>
        // </div>
  );
};
