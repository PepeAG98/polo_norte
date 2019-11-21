import React, { useState, Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import swal from 'sweetalert';
import Cookies from 'universal-cookie';
import Paper from '@material-ui/core/Paper';
const cookies = new Cookies();
const Snow = require('react-snow-effect');
const axios = require('axios');

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      username: '',
      password: ''
    }
    this.myName = this.myName.bind(this);
    this.myUser = this.myUser.bind(this);
    this.myPsw = this.myPsw.bind(this);
    this.save = this.save.bind(this);
  }

  componentDidMount() {
    if(cookies.get('isLogin') == "true"){
      swal("Usuario valido", "Usted ya tiene una cuenta", "success")
      .then(() => {
          this.props.history.push('/dashboard');
      });
    }
  }

  myName(event) {
    this.setState({
      name: event.target.value
    });
  }

  myUser(event) {
    this.setState({
      username: event.target.value
    });
  }

  myPsw(event) {
    this.setState({
      password: event.target.value
    });
  }

  save(){
    if(this.state.name == "" || this.state.username == "" || this.state.password == "")
      swal("Error", "Ningún dato puede estar en blanco", "error");
      else{
        axios.post('https://santa-api-ldaw.herokuapp.com/users', {
          name: this.state.name,
          username: this.state.username,
          password: this.state.password
        })
        .then(res => {
          swal("Usuario Registrado", `${this.state.name} has sido registrado`, "success")
          .then(() => {
              this.props.history.push('/');
          })
        })
        .catch(err => {
            console.log(err);
            swal("Error", "Por favor revisa tus datos", "error");
        });
      }
  }

  render() {
    return(
      <div className="main">
          <Snow />
          <Grid container direction="column" justify="center" alignItems="center">
            <img src="https://images.vexels.com/media/users/3/127090/isolated/preview/a608267cdd6ada5e7d294c4b01c92d40-cara-de-santa-claus-asombrada-by-vexels.png" width="20%"/>    
              <Typography variant="h3" gutterBottom>
                  Registro
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                  Por favor introduce los datos siguientes:
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
                      required
                      fullWidth
                      id="name"
                      label="Nombre completo"
                      margin="normal"
                      variant="outlined"
                      onChange={this.myName}
                  />
              </Grid>
              <Grid item xs={12} lg={12} style={{paddingRight: 20, paddingLeft: 20}}>
                  <TextField
                      required
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
                      required
                      fullWidth
                      id="password"
                      type="password"
                      label="Password"
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
              <Button variant="contained" color="primary" onClick={this.save} style={{margin: 20}}>
                  Registrar
              </Button>
          </Grid>
          <Grid container direction="column" justify="center" alignItems="center">
            <Typography variant="body1" gutterBottom>
                  ¿Ya tienes cuenta? <Link to="/"><b style={{color: '#3f51b5'}}>Inicia Sesión</b></Link>
              </Typography>
          </Grid>
      </div>
    );
  }
}

export default Register;