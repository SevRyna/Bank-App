import React, { Component } from 'react';
import "./index.css";
// import { useState } from "react";
// import { Alert, Loader, LOAD_STATUS } from "../../component/load";

// const [status, setStatus] = useState(null);
// const [message, setMessage] = useState("");

class DataTransaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      sum_res: 0,
      error: null,
    };
  }
// -----------------------------------------------------------------------down

// -----------------------------------------------------------------------up

  componentDidMount() {
    // Define the URL for your backend API
    const apiUrl = `http://localhost:4000/transaction`;
    const convertData = () =>{
      const value = JSON.stringify({
          //  op_id: 2,
           op_id1: localStorage.getItem('op_id'),
           email: localStorage.getItem('email'),
         });
        //  console.log('convert value=', value);
     return value;
    } 
    // fetch(apiUrl)
    fetch(apiUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: convertData(),
          })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Assuming your backend response is in the form of { "oper": [...] }
        this.setState({ data: data.data_res });
        // const cur = document.getElementsByClassName('sum1');
        // cur[0].textContent = data.sum_res;  

        // console.log('cur=',data.sum);
        // localStorage.setItem("email",data.email);      

      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  render() {
    const { data, error } = this.state;
    if (error) {
      return <div>Error!: {error}</div>;
    } else if (!data) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <div class='hidden'>
          {
              document.getElementsByClassName('sum1')[0].textContent = data.sum
          }
          </div>
          {/* Data from Backend */}
          <table> 
            <tr>
              <td class='first'>Date</td>
              <td class="second">{data.date}</td>
            </tr>
            <tr>
              <td class='first'>Address</td>
              <td class="second">{data.address}</td>
            </tr>
            <tr>
              <td class='first left_div'>Type</td>
              <td class="second right_div">
                  {data.type}
              </td>
            </tr>            
          </table>
          {/* <table className="table-list">
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="getOperations sender-sign">
                    <img src={item.img} alt="user" />
                  </td>
                  <td className="getOperations user" ><div className="getOperations email">{item.email}</div>                                      
                        <div className="getOperations kind">{item.time} {item.kind}</div>
                  </td>
                  <td className="getOperations amount">{item.sum}</td>
                </tr>
              ))}
            </tbody>
          </table> */}
        </div>
      );
    }
  }
}

export default DataTransaction;
