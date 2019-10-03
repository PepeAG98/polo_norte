import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import Register from './register';
import Login from './login';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
      </Router>
    </div>
  );
}

export default App;
