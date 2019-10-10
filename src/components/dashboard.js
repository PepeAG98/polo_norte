import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './styles/dashboard.css';

export default class Dashboard extends Component {
    render(){
        return(
            <div className="row">
                <div className="col s12 l8 offset-l2">
                    <div className="row">
                        <div className="col s12 l6">
                            <Link to="/create-child">
                                <div className="card card-link center-align">
                                    <i className="material-icons large">person_add</i>
                                    <h4>Add Child</h4>
                                </div>
                            </Link>
                        </div>
                        <div className="col s12 l6">
                            <Link to="/children-list">
                                    <div className="card card-link center-align">
                                        <i className="material-icons large">view_list</i>
                                        <h4>Children List</h4>
                                    </div>
                                </Link>
                        </div>
                        <div className="col s12 l6">
                            <Link to="/create-letter">
                                    <div className="card card-link center-align">
                                        <i className="material-icons large">add_box</i>
                                        <h4>Add Letter</h4>
                                    </div>
                                </Link>
                        </div>
                        <div className="col s12 l6">
                            <Link to="/letter-list">
                                    <div className="card card-link center-align">
                                        <i className="material-icons large">mail</i>
                                        <h4>Letter List</h4>
                                    </div>
                                </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}