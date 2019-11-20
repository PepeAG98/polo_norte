import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import swal from 'sweetalert';
const axios = require('axios');

/*
//Estilos para los Inputs
const useStyles = makeStyles(theme => ({
textField: {
    paddingRight: 20,
    paddingLeft: 20
},
button: {
    margin: theme.spacing(1),
}
}));

//Estilos para Mensaje de Error
const useStyles1 = makeStyles(theme => ({
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
  }));

  //Wrapper de Error
  function MySnackbarContentWrapper(props) {
    const classes = useStyles1();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];
  
    return (
      <SnackbarContent
        className={clsx(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
        {...other}
      />
    );
}

//Usos de Wrapper de Error
MySnackbarContentWrapper.propTypes = {
    className: PropTypes.string,
    message: PropTypes.string,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
  };


  const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };

function Login(props) {
    const classes = useStyles();
    let [user, setUser] = useState('');
    let [password, setPassword] = useState('');
    //Manejar Wrapper
    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    function SignIn () {
        if(user == '' || password == '') {
            setOpen(true);
        } else {
            axios.post('https://santa-api-ldaw.herokuapp.com/users/login', {
                username: user,
                password: password
              })
              .then(res => {
                swal("Login Realizado", `${user} has ingresado al sistema`, "success")
                .then(() => {
                    props.history.push('/dashboard');
                });
              })
              .catch(err => {
                console.log(err);
                swal("Error", "Por favor revisa tus datos", "error");
              });
        }
    }

    return(
        <div className="main">
            <Grid container direction="column" justify="center" alignItems="center">
                <Typography variant="h3" gutterBottom>
                    Santa Claus App
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Por favor introduce tu nombre de usuario y contraseña
                </Typography>
            </Grid>
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
                    Ingresar
                </Button>
            </Grid>
            <Grid container direction="column" justify="center" alignItems="center">
                <Typography variant="body1" gutterBottom>
                    ¿Aún no tienes una cuenta? <Link to="/register"><b>Registrate</b></Link>
                </Typography>
            </Grid>
            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
            >
                <MySnackbarContentWrapper
                onClose={handleClose}
                variant="error"
                message="Ningún valor puede estar vacio"
                />
            </Snackbar>
        </div>
    );
}*/

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
          <Grid container direction="column" justify="center" alignItems="center">
              <Typography variant="h3" gutterBottom>
                  Santa Claus App
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                  Por favor introduce tu nombre de usuario y contraseña
              </Typography>
          </Grid>
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
                  ¿Aún no tienes una cuenta? <Link to="/register"><b style={{color: 'red'}}>Registrate</b></Link>
              </Typography>
          </Grid>
      </div>
  );
  }
}

export default Login;