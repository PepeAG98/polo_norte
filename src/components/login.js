import React, { Component, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const axios = require('axios');


/*class Login extends Component {
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
              this.props.history.push(`/dashboard`);
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
}*/

const useStyles = makeStyles(theme => ({
textField: {
    paddingRight: 20,
    paddingLeft: 20
},
button: {
    margin: theme.spacing(1),
}
}));

function Login() {
    const classes = useStyles();
    let [user, setUser] = useState('');
    let [password, setPassword] = useState('');

    function SignIn () {
        console.log(user, password);
    }

    return(
        <div className="main">
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="stretch"
            >
                <Grid item xs={12} lg={12} className={classes.textField}>
                    <TextField
                        fullWidth
                        id="username"
                        label="Username"
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => setUser(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} lg={12} className={classes.textField}>
                    <TextField
                        fullWidth
                        id="password"
                        type="password"
                        label="Password"
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
            >
                <Button variant="contained" color="primary" className={classes.button} onClick={SignIn}>
                    Registrar
                </Button>
            </Grid>
        </div>
    );
}

export default Login;