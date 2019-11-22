import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import swal from 'sweetalert';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const axios = require('axios');
const Snow = require('react-snow-effect');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: ''
    }
    this.myUser = this.myUser.bind(this);
    this.myPsw = this.myPsw.bind(this);
    this.doLogin = this.doLogin.bind(this);
  }

  componentDidMount() {
    if(cookies.get('isLogin') == 'true')
      swal("Usuario Logeado", "Usted ya ingreso al sistema", "success")
      .then(() => {
        this.props.history.push('/dashboard');
      });
  }

  myUser(event) {
    this.setState({
      user: event.target.value
    });
  }

  myPsw(event) {
    this.setState({
      password: event.target.value
    });
  }

  doLogin(){
    if(this.state.name == "" || this.state.username == "" || this.state.password == "")
      swal("Error", "Ningún dato puede estar en blanco", "error");
    else {
      axios.post('https://santa-api-ldaw.herokuapp.com/users/login', {
          username: this.state.user,
          password: this.state.password
        })
        .then(res => {
          swal("Login Realizado", `${this.state.user} has ingresado al sistema`, "success")
          .then(() => {
              cookies.set('isLogin', 'true', { path: '/' });
              this.props.history.push('/dashboard');
          });
        })
        .catch(err => {
          console.log(err);
          swal("Error", "Por favor revisa tus datos", "error");
        });
    }
  }

  render() {
    return(
      <div className="main">
          <Snow />
          <Grid container direction="column" justify="center" alignItems="center">
              <img src="https://images.vexels.com/media/users/3/127090/isolated/preview/a608267cdd6ada5e7d294c4b01c92d40-cara-de-santa-claus-asombrada-by-vexels.png" width="20%"/>
              <Typography variant="h3" gutterBottom>
                  Santa Claus App
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                  Por favor introduce tu nombre de usuario y contraseña
              </Typography>
          </Grid>
          <Paper style={{margin: 20, background: '#eee'}}>
          <Grid
              container
              direction="column"
              justify="center"
              alignItems="stretch"
          >
              <Grid item xs={12} lg={12} style={{paddingRight: 20, paddingLeft: 20}}>
                  <TextField
                      fullWidth
                      id="username"
                      label="Usuario"
                      margin="normal"
                      variant="outlined"
                      onChange={this.myUser}
                  />
              </Grid>
              <Grid item xs={12} lg={12} style={{paddingRight: 20, paddingLeft: 20}}>
                  <TextField
                      fullWidth
                      id="password"
                      type="password"
                      label="Contraseña"
                      margin="normal"
                      variant="outlined"
                      onChange={this.myPsw}
                  />
              </Grid>
          </Grid>
          </Paper>
          <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="center"
          >
              <Button variant="contained" color="primary" style={{margin: 20}} onClick={this.doLogin}>
                  Ingresar
              </Button>
          </Grid>
          <Grid container direction="column" justify="center" alignItems="center">
              <Typography variant="body1" gutterBottom>
                  ¿Aún no tienes una cuenta? <Link to="/register"><b style={{color: '#3f51b5'}}>Registrate</b></Link>
              </Typography>
          </Grid>
      </div>
  );
  }
}

export default Login;