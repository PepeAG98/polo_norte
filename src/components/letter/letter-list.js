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
import swal from 'sweetalert';
const axios = require('axios');

/*class ChildrenList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:3000/children')
        .then(res => {
            console.log(res.data.children);
            this.setState({
                data: res.data.children
            });
        })
        .catch(err => {
            console.log(err);
        });
        //console.log(this.state.data);
    }

    delete(child){
        console.log(`Voy a borrar: ${child}`);
        axios.delete(`http://localhost:3000/children/${child}`)
        .catch(err => {
            console.log(err);
        })
    }

    render(){
        return(
            <div className="row">
                <div className="col s12 l8 offset-l2">
                    <h5 className="center-align">Children List</h5>
                    <table className="striped">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Birth Date</th>
                            <th>Address</th>
                            <th>Evil</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.data.map((children, index) => {
                            return(<tr key={index}>
                                <td>{children.name}</td>
                                <td>{children.date_birth}</td>
                                <td>{children.address}</td>
                                <td>{children.evil.toString()}</td>
                                <td><Link to={`/edit-child/${children._id}`}><i className="material-icons">edit</i></Link></td>
                                <td><i className="material-icons" onClick={() => this.delete(children._id)}>delete</i></td>
                            </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}*/

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
                <Link to="/create-child"><Button
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
                                <Typography className={classes.heading}>Expansion Panel 1</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                                >
                                <Typography className={classes.heading}>Expansion Panel 2</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            <ExpansionPanel disabled>
                                <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                                >
                                <Typography className={classes.heading}>Disabled Expansion Panel</Typography>
                                </ExpansionPanelSummary>
                            </ExpansionPanel>
                        </div>
                </Grid>
            </Grid>
        </div>
    );
}

export default LetterList;