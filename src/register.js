import React, { Component } from 'react';
import { saveSnapshotFile } from 'jest-snapshot/build/utils';
const axios = require('axios');

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            username: '',
            email: '',
            password: ''
        }
        this.save = this.save.bind(this);
        this.name = React.createRef();
        this.user = React.createRef();
        this.email = React.createRef();
        this.psw = React.createRef();
    }

    save(){
        /*this.setState({
            name: this.name.current.value,
            username: this.user.current.value,
            email: this.email.current.value,
            password: this.psw.current.value
        })

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
          axios.post('https://still-garden-88285.herokuapp.com/draft_tweets', {
            user_name: 'ctellezesp',
        	avatar: 'https://vignette.wikia.nocookie.net/death-battle-en-espanol/images/1/16/Crash_Bandicoot.png/revision/latest?cb=20180405173124&path-prefix=es',
        	description: 'Probando API'
          })
          .then(res => {
              console.log(res);
              window.alert("Tweet Fetched");
          })
          .catch(err => {
              console.log(err);
              window.alert("No Twitetr");
          })*/
          fetch('http://localhost:3000/users', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
             body: JSON.stringify( {
                name: this.state.name,
                username:this.state.username,
                email: this.state.email,
                password: this.state.password
            })
        }).then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="row">
                <div className="col s12 l8 offset-l2">
                    <div className="row">
                        <div className="input-field col s12">
                            <input  id="name" type="text" className="validate" ref={this.name} />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="input-field col s12">
                            <input  id="username" type="text" className="validate" ref={this.user}/>
                            <label htmlFor="username">User</label>
                        </div>
                        <div className="input-field col s12">
                            <input  id="email" type="text" className="validate" ref={this.email} />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field col s12">
                            <input id="password" type="password" className="validate" ref={this.psw}/>
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <a className="waves-effect waves-light btn right" onClick={this.save}>Register</a>
                </div>
            </div>
        )
    }
}