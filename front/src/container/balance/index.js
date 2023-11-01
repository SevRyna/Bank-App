import "./index.css";
import { Link } from 'react-router-dom';
import  Menu from "../../component/menu";
import  MenuBalance from "../../component/menuBalance";
import DataFetcher from "../../component/getOperations";
import DataSum from "../../component/getOperationsSum";

export default function Component() {
  return (
    <div className="container balance">
      <div className='balance-container'>

        <div className="head">
          <Menu />  
          <MenuBalance />  
              <h4>Main wallet</h4>
              <h1><DataSum /></h1>
              
              <div className="rs">
                  <label htmlFor="recieve-button" className="recieve-label" >Recieve</label>
                  <Link id="recieve-button" className="recieve" to="/recieve">
                  </Link> 
                  <label htmlFor="send-button" className="send-label" >Send</label>
                  <Link id="send-button" className="send" to="/send">
                  </Link>                                
              </div>
          </div>
          
          <div className="data-f">
            <div class="balance-list">
              <DataFetcher />
            </div>
          </div>

      </div>
        <img src="HomeIndicator.png" class="h-i"  alt="cam"/>
    </div>
  );
}
