import React, { Component } from 'react';

class DataSum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      sum_res: 0,
      error: null,
    };
  }

  // componentDidMount() {
  //   // Define the URL for your backend API
  //   const apiUrl = `http://localhost:4000/getOperById?email=user1@mail.com`;
  //   // const apiUrl = `https://your-backend-api-url.com?email=user1@mail.com`;

  //   fetch(apiUrl)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       // Assuming your backend response is in the form of { "oper": [...] }
  //       this.setState({ data: data });
  //       this.setState({ sum_res: data.sum_res });        
  //     })
  //     .catch((error) => {
  //       this.setState({ error: error.message });
  //     });
  // }

  componentDidMount() {
    // Define the URL for your backend API
    const apiUrl = `http://localhost:4000/getOperById`;
    const convertData = () =>{
      const value = JSON.stringify({
           email: localStorage.getItem("email"),
         });
         console.log('convert value=', value);
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
        this.setState({ data: data });      
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  render() {
    const { data, error } = this.state;

    if (error) {
      return <div>Error: {error}</div>;
    } else if (!data) {
      // console.log(data);      
      // console.log(data);
      return <div>Loading...</div>;
    } else {
      return (
          <div>$ {data.sum_res}</div>
      );
    }
  }
}

export default DataSum;
