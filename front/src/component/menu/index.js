import "./index.css";
import  GetTime from "../../component/getTime";

export default function Component({back}) {
  return (
    <div className="menu">
      {/* onClick="backButton.back(); */}
      {/* <div className="back-button" >
      </div>  */}
        <div className="cwb" >
          <img src="/png/CellularWifiBattery.png" className="cwb-png" alt="<" />
        </div>
        <GetTime />
        {back}
    </div>
  );
}
