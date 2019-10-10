import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

//Components
import Register from './components/register';
import Login from './components/login';
import CreateChild from './components/children/create-child';
import EditChild from './components/children/edit-child';
import ChildrenList from './components/children/children-list';
import CreateLetter from './components/letter/create-letter';
import EditLetter from './components/letter/edit-letter';
import LetterList from './components/letter/letter-list';
import Dashboard from './components/dashboard';
import Menu from './components/menu';

function App() {
  return (
    <div>
      <Router>
        <Menu />
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/create-child" component={CreateChild} />
        <Route path="/edit-child/:id" component={EditChild} />
        <Route path="/children-list" component={ChildrenList} />
        <Route path="/create-letter" component={CreateLetter} />
        <Route path="/edit-letter/:id" component={EditLetter} />
        <Route path="/letter-list" component={LetterList} />
      </Router>
    </div>
  );
}

export default App;
