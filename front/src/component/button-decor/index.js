import "./index.css";

export default function Component({ disabled,  id, handleSubmit, text, icon, sozicon }) {
  return (
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
  );
};
