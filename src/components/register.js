import React, { Component, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const axios = require('axios');

const useStyles = makeStyles(theme => ({
    textField: {
        paddingRight: 20,
        paddingLeft: 20
    },
    button: {
        margin: theme.spacing(1),
    }
  }));

function Register(){
    const classes = useStyles();
    let [name, setName] = useState('');
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    function save(){
        /*axios.post('http://localhost:3000/users', {
            name: name,
            username: username,
            password: password
          })
          .then(res => {
              console.log(res);
              window.alert("Usuario registrado");
          })
          .catch(err => {
              console.log(err);
              window.alert("Error");
          });*/
          console.log(name, username, password);
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
                        id="name"
                        label="Name"
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} lg={12} className={classes.textField}>
                    <TextField
                        fullWidth
                        id="username"
                        label="Username"
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => setUsername(e.target.value)}
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
                <Button variant="contained" color="primary" className={classes.button} onClick={save}>
                    Registrar
                </Button>
            </Grid>
        </div>
    );
}

export default Register