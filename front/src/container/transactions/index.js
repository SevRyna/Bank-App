import "./index.css";
// import { Link } from 'react-router-dom';
// import  Field from "../../component/field";
// import  Buttonlink from "../../component/button-link";
// import  Operations from "../../component/operations";
import  Menu from "../../component/menu";
// import  Field from "../../component/field";
import  Heading from "../../component/heading";
import BackButton from "../../component/back-button";
// import  GetTime from "../../component/getTime";
import DataTransaction from "../../component/getTransaction";
// import DataSum from "../../component/getOperationsSum";

export default function Component({op_id = 1}) {
  return (
    <div className="container transactions">
        <div className='transactiom-container'>

            <div className="head">
            <Menu back={<BackButton to="/balance" />} />
                <h3 class="info">Transaction</h3>
                <h1 class="sum1"></h1>
                
                {/* <Heading 
                  title= '0'
                info="Transaction" /> */}
            

            {/* <Operations />    */}
            <div className="data-f">          
                <DataTransaction
                
                />
            </div>

            </div>
        </div>
    </div>
  );
}
