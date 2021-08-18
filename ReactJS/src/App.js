import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from './pages/Login';
import Default from "./pages/Default";
import Principal from "./pages/Principal";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} initial={true} />
          <Route exact path="/principal" component={Principal} />
          <Route component={Default} />
        </Switch>
      </Router>
    );
  }
}

export default App;
