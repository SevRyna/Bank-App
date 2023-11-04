import "./index.css";
import  Menu from "../../component/menu";
import  Heading from "../../component/heading";
import BackButton from "../../component/back-button";
import DataNotifications from "../../component/getNotifications";

export default function Component() {
  return (
    <div className="container notifications">
        <div className='notification-container'>

            <div className="head">
            <Menu back={<BackButton to="/balance" />} />
            <Heading title="Notifications" />

             <div className="data-f">     
                 
                <DataNotifications/>
            </div>

            </div>
        </div>
    </div>
  );
}
