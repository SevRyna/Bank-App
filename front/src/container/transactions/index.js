import "./index.css";
import  Menu from "../../component/menu";
import BackButton from "../../component/back-button";
import DataTransaction from "../../component/getTransaction";

export default function Component({op_id = 1}) {
  return (
    <div className="container transactions">
        <div className='transactiom-container'>

            <div className="head">
            <Menu back={<BackButton to="/balance" />} />
                <h3 class="info">Transaction</h3>
                <h1 class="sum1"></h1>

            <div className="data-f">          
                <DataTransaction
                
                />
            </div>

            </div>
        </div>
    </div>
  );
}
