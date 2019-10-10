import React, { Component } from 'react';
import '../styles/children-list.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const axios = require('axios');

export default class ChildrenList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3000/children')
        .then(res => {
            console.log(res.data.children);
            this.setState({
                data: res.data.children
            });
        })
        .catch(err => {
            console.log(err);
        });
        //console.log(this.state.data);
    }

    render(){
        return(
            <div className="row">
                <div className="col s12 l8 offset-l2">
                    <h5 className="center-align">Children List</h5>
                    <table className="striped">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Birth Date</th>
                            <th>Address</th>
                            <th>Evil</th>
                            <th>Edit</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.data.map((children, index) => {
                            return(<tr key={index}>
                                <td>{children.name}</td>
                                <td>{children.date_birth}</td>
                                <td>{children.address}</td>
                                <td>{children.evil.toString()}</td>
                                <td><Link to={`/edit-child/${children._id}`}><i className="material-icons">edit</i></Link></td>
                            </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}