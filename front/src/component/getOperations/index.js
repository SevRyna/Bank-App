import { Component } from 'react';
import "./index.css";

class DataFetcher extends Component {

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

    const apiUrl = `http://localhost:4000/getOperById`;
    const convertData = () =>{
      const value = JSON.stringify({
           email: localStorage.getItem("email"),
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
        this.setState({ data: data.oper });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  render() {
    const { data, error } = this.state;
    const handleLike = (params) => {     
        localStorage.setItem('op_id', params);
        window.location.assign('/transaction/');
    }
    
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
                <tr key={item.id} id={"op_id"+item.op_id} onClick={() => handleLike(item.op_id)}>
                  <td className="getOperations sender-sign">
                    {/* {item.op_id} */}
                    <img src={item.img} alt="user" />
                  </td>
                  <td className="getOperations user" ><div className="getOperations email">{item.email2}</div>                                      
                        <div className="getOperations kind">{item.time}-{item.kind}</div>
                  </td>
                  <td className="getOperations amount">{item.sum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default DataFetcher;
