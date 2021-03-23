import React, {Component, Route} from "react";
import { BrowserRouter, Switch } from 'react-router-dom';
import Home from './components/Home.js';
import DashboardCW from './components/DashboardCW.js';
import DashboardWz from './components/DashboardWz.js';
import SignIn from './components/SignIn.js';
import PrivateRoute from './components/PrivateRoute.js';
import PublicRoute from './components/PublicRoute.js';
import Register from './components/Register.js';
import Login from './components/Login.js';
import NotFound from './components/404.js';


const API_URL = "http://" + process.env.REACT_APP_BASE_URL + ":8080/auth/";


class App extends Component {

  constructor(props) {
    super(props);

  }
  
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <PublicRoute restricted={false} component={Home} path="/" exact />
          <PublicRoute restricted={true} component={SignIn} path="/signin" exact />
          <PublicRoute restricted={true} component={Login} path="/login" exact />
          <PublicRoute restricted={true} component={Register} path="/register" exact />
          <PrivateRoute component={DashboardCW} path="/dashboard/cold_war" exact />
          <PrivateRoute component={DashboardWz} path="/dashboard/warzone" exact />
          <PublicRoute restricted={false} component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;