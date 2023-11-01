import "./index.css";
import { Alert, Loader, LOAD_STATUS } from "../../component/load";
import { useState } from "react";

const date = new Date();
const showTime = date.getHours() 
    + ':' + date.getMinutes();
    // + ":" + date.getSeconds();

export default function Component() {
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState("");

    const handleSubmit = (value) => {
        // console.log('sended value=', value);
        return sendData({ value });
      };
    
      const sendData = async () => {
        setStatus(LOAD_STATUS.PROGRESS);
            
        try {
          const res = await fetch("http://localhost:4000/getUser", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            // body: convertData(),
            body: false,
          });
          // console.log('body=', convertData(dataToSend));
          // console.log('body=', dataToSend.value);
    
          const data = await res.json();

          console.log('data=', data)
    
          if (res.ok) {
            // setStatus(null);
            setStatus(LOAD_STATUS.SUCCESS);
            // if (onCreate) onCreate();
          } else {
            setMessage(data.message);
            setStatus(LOAD_STATUS.ERROR);
          }
        } catch (error) {
          setMessage(error.message);
          setStatus(LOAD_STATUS.ERROR);
        }
      };
    //   const convertData = () => {
        // const convertData = ({ value }) => {  
        // console.log('convert value=', value);
        // console.log('convert email=', value.email);
        //    value = JSON.stringify({
        //         email: value.email,
        //         sum: value.password,
        //         op_id: 2,
        //       });
        // return value;
      

    return
     (
        // {status === LOAD_STATUS.ERROR && (
        //     <Alert status={status} message={message} />
        //   )}
        //   {status === LOAD_STATUS.PROGRESS &&
        //       //  window.open("http://localhost:3000/balance/")
        //   <Loader />
        //   }
        //   {status === LOAD_STATUS.SUCCESS &&  
        //     // <Alert status={status} message="Ok" />        
        //     // window.location.assign('/balance/')
        //     <Alert status={status} message="Ok" />
        //    }      
        // {handleSubmit}  
    // <div className="user-show">
    //     <div align="left">{showTime}</div>        
    //     <div class='clear' />
    // </div>
    handleSubmit()
);
}