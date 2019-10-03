import React, { Component } from 'react';
const axios = require('axios');

export default class Login extends Component {
    render() {
        return (
            <div className="row">
                <div className="col s12 l8 offset-l2">
                    <div className="row">
                        <div className="input-field col s12">
                            <input  id="username" type="text" className="validate" />
                            <label htmlFor="username">User</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate" />
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}