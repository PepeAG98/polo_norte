import React, { Component, useState, useEffect } from 'react';
import Menu from '../menu';
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
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import swal from 'sweetalert';
const axios = require('axios');

//Estilos para Inputs desde Material UI
const useStyles = makeStyles(theme => ({
    textField: {
        paddingRight: 20,
        paddingLeft: 20
    },
    button: {
        margin: theme.spacing(1),
    },
    textField2: {
        paddingRight: 40,
        paddingLeft: 0,
        paddingTop: 15
    },
    switch: {
        marginTop: 25
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

function CreateChild(props){
    const classes = useStyles();
    let [name, setName] = useState('');
    let [date_birth, setDateBirth] = useState('2019-01-01');
    let [address, setAddress] = useState('');
    let [evil, setEvil] = useState(false);
    //Manejar Wrapper
    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    function save(){
        if(name == '' || date_birth == '' || address == '' ) {
            setOpen(true);
        } else {
            console.log(name, date_birth, address, evil);
            swal("Niño Agregado", `${name} ha sido agregado`, "success")
            .then(() => {
                props.history.push('/children-list')
            })
        }
        /*axios.post('http://localhost:3000/children', {
            name: this.state.name,
            date_birth: this.state.date,
            address: this.state.address,
            evil: this.state.evil
          })
          .then(res => {
              console.log(res);
              window.alert("Children Added");
              this.props.history.push(`/children-list`);
          })
          .catch(err => {
              console.log(err);
              window.alert("Error");
          });*/
    }

    return(
        <div className="main">
            <Menu />
            <Grid container direction="column" justify="center" alignItems="center">
                <Typography variant="h3" gutterBottom>
                    Registrar Niño
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Por favor introduce los datos siguientes:
                </Typography>
            </Grid>
            <Grid container direction="row" justify="center" alignItems="stretch">
                <Grid item xs={12} lg={12} className={classes.textField}>
                    <TextField
                        required
                        fullWidth
                        id="name"
                        label="Nombre"
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => setName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={4} className={classes.textField2}>
                    <TextField
                        fullWidth
                        id="date"
                        label="Fecha Nacimiento"
                        type="date"
                        defaultValue={date_birth}
                        variant="outlined"
                        className={classes.textField}
                        
                        onChange={(e) => setDateBirth(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={7}  className={classes.textField}>
                    <TextField
                        required
                        fullWidth
                        id="address"
                        label="Dirección"
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={1} className={classes.switch}>
                    <FormControlLabel
                        control={
                        <Switch checked={evil} onChange={(e) => setEvil(!evil)} value="checkedA" />
                        }
                        label="Maldad"
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
}

export default CreateChild;