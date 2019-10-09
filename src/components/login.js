import React, { Component } from 'react';
const axios = require('axios');

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.myUser = this.myUser.bind(this);
        this.myPsw = this.myPsw.bind(this);
        this.logged = this.logged.bind(this);
    }

    myUser(event){
        this.setState({username: event.target.value});
    }

    myPsw(event){
        this.setState({password: event.target.value});
    }

    logged(){
        //No usamos bcrypt aqui
        console.log(this.state);
        axios.post('http://localhost:3000/users/login', {
            username: this.state.username,
            password: this.state.password
          })
          .then(res => {
              console.log(res);
              window.alert("Login Realizado");
          })
          .catch(err => {
              console.log(err);
              window.alert("Usuario o Contraseña incorrecta");
          });
    }

    render() {
        return (
            <div className="row">
                <div className="col s12 l8 offset-l2">
                    <div className="row">
                        <div className="input-field col s12">
                            <input  id="username" type="text" className="validate" onChange={this.myUser}/>
                            <label htmlFor="username">User</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate" onChange={this.myPsw}/>
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <a className="waves-effect waves-light btn right blue" onClick={this.logged}>Login</a>
                </div>
            </div>
        )
    }
}