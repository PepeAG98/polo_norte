import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
//import './styles/menu.css';

export default class Menu extends Component{
    render(){
        return (
            <div className="navbar-fixed">
                <nav className="blue">
                    <div className="nav-wrapper">
                        <a href="#!" className="brand-logo">Logo</a>
                        <ul className="right hide-on-med-and-down">
                            <li><Link to="/dashboard"><i className="material-icons left white-text">dashboard</i>Dashboard</Link></li>
                            <li><Link to="/children-list"><i className="material-icons left white-text">child_care</i>Children</Link></li>
                            <li><Link to="/letter-list"><i className="material-icons left white-text">assignment</i>Letter</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
          );
    }
}