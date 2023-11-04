import { Component } from 'react';
import "./index.css";

class DataTransaction extends Component {
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

        </div>
      );
    }
  }
}

export default DataTransaction;
