import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Menu from './menu';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupIcon from '@material-ui/icons/Group';
import PostAddIcon from '@material-ui/icons/PostAdd';
import DescriptionIcon from '@material-ui/icons/Description';
import './styles/dashboard.css';

const useStyles = makeStyles(theme => ({
    root: {
      background: '#f5f5f5'
    }
}));

function Dashboard(props) {
    const classes = useStyles();
    return(
        <div className="main">
            <Menu />
            <Grid container direction="row" justify="center" alignItems="center" spacing={3}>
                <Grid item xs={12} md={6} lg={6}>
                    <Link to="create-child"><Paper className={classes.root}>
                        <Grid container direction="column" justify="center" alignItems="center">
                            <Grid item xs={12}>
                                <PersonAddIcon style={{ fontSize: 100 }}/>
                                <Typography variant="h5" gutterBottom>
                                    Agregar Niño
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper></Link>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Link to="children-list"><Paper className={classes.root}>
                        <Grid container direction="column" justify="center" alignItems="center">
                            <Grid item xs={12}>
                                <GroupIcon style={{ fontSize: 100 }}/>
                                <Typography variant="h5" gutterBottom>
                                    Lista Niños
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper></Link>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Link to="create-letter"><Paper className={classes.root}>
                        <Grid container direction="column" justify="center" alignItems="center">
                            <Grid item xs={12}>
                                <PostAddIcon style={{ fontSize: 100 }}/>
                                <Typography variant="h5" gutterBottom>
                                    Agregar Carta
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper></Link>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Link to="letter-list"><Paper className={classes.root}>
                        <Grid container direction="column" justify="center" alignItems="center">
                            <Grid item xs={12}>
                                <DescriptionIcon style={{ fontSize: 100 }}/>
                                <Typography variant="h5" gutterBottom>
                                    Lista Carta
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper></Link>
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard;