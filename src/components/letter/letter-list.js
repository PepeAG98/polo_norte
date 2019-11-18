import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Menu from '../menu';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import swal from 'sweetalert';
const axios = require('axios');

//Solo Ejemplo
const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    rootList: {
        flexGrow: 1,
        maxWidth: 752,
      },
      demo: {
        backgroundColor: theme.palette.background.paper,
      },
      title: {
        margin: theme.spacing(4, 0, 2),
      },
}));

function LetterList(props){
    const classes = useStyles();
    //let [data, setData] = (null);
    useEffect(() => {
        /*axios.get('http://localhost:3000/children')
        .then(res => {
            console.log(res.data.children);
            this.setState({
                data: res.data.children
            });
        })
        .catch(err => {
            console.log(err);
        });
        //console.log(this.state.data);*/
    });

    function deleteLetter(letter) {
        swal({
            title: "¿Quieres eliminar a este niño?",
            text: "Una vez que lo elimines no podrás recuperar la información",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Información eliminada", {
                icon: "success",
              });
            } else {
              swal("Eliminación Cancelada");
            }
          });
    }
    return(
        <div className="main">
            <Menu />
            <Grid container direction="column" justify="flex-end" alignItems="flex-end">
                <Link to="/create-letter"><Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.button}
                    startIcon={<AddIcon />}
                >
                    Agregar Carta
                </Button></Link>
            </Grid>
            <Grid container direction="column" justify="center" alignItems="stretch">
                <Grid item xs={12}>
                    <div className={classes.root}>
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            >
                            <Typography className={classes.heading}>Carlos Erasmo Téllez Espejel</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                            <div className={classes.demo}>
                                <List dense={true}>
                                    <ListItem>
                                    <ListItemAvatar>
                                        <Avatar>
                                        <CardGiftcardIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Balón"
                                    />
                                    </ListItem>
                                </List>
                            </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default LetterList;