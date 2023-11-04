import React, { Component } from 'react';
import "./index.css";

class DataNotifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      sum_res: 0,
      error: null,
    };
  }

  componentDidMount() {
    // Define the URL for your backend API
    const apiUrl = `http://localhost:4000/geNotiByEmail`;
    const convertData = () =>{
      const value = JSON.stringify({
           email: localStorage.getItem("email"),
         });
         console.log('convert value=', value);
     return value;
    }
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
        this.setState({ data: data.noti });
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
          <div class="email-st">{localStorage.getItem("email")}</div> 
          {/* Data from Backend */}
          <table className="table-list">
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td className="getOperations sender-sign">
                    {/* {item.op_id} */}
                    <img src={item.img} alt="user" />
                  </td>
                  <td className="getOperations user" ><div className="getOperations email">{item.email}</div>                                      
                        <div className="getOperations kind">{item.time} / {item.diff} /  {item.kind}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default DataNotifications;
