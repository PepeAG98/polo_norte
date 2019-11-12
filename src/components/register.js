import React, { Component } from 'react';
const axios = require('axios');

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            username: '',
            password: ''
        }
        this.save = this.save.bind(this);
        this.myUser = this.myUser.bind(this);
        this.myName = this.myName.bind(this);
        this.myPsw = this.myPsw.bind(this);
    }

    myName(event){
        this.setState({name: event.target.value});
    }

    myUser(event){
        this.setState({username: event.target.value});
    }

    myPsw(event){
        this.setState({password: event.target.value});
        
    }

    save(){
        axios.post('http://localhost:3000/users', {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
          })
          .then(res => {
              console.log(res);
              window.alert("Usuario registrado");
          })
          .catch(err => {
              console.log(err);
              window.alert("Error");
          });
    }

    render() {
        return (
            <div className="row">
                <div className="col s12 l8 offset-l2">
                    <div className="row">
                        <div className="input-field col s12">
                            <input  id="name" type="text" className="validate" onChange={this.myName} />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="input-field col s12">
                            <input  id="username" type="text" className="validate" onChange={this.myUser}/>
                            <label htmlFor="username">User</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate" onChange={this.myPsw}/>
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <a className="waves-effect waves-light btn right blue" onClick={this.save}>Register</a>
                </div>
            </div>
        )
    }
}