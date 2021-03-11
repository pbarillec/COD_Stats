import React, {Component} from "react";

const API_URL = "http://" + process.env.REACT_APP_BASE_URL + ":8080/auth/";


class App extends Component {

  constructor(props) {
    super(props);

  }
  
  render () {
  return (
    <h1>SALUT PIERRE</h1>
  );
  }
}

export default App;