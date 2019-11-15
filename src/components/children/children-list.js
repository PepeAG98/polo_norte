import React, { Component, useState, useEffect } from 'react';
import '../styles/children-list.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Menu from '../menu';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
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
function createData(name, date_birth, address, evil) {
    return { name, date_birth, address, evil };
  }
  
const rows = [
    createData('Carlos Erasmo Tellez Espejel', '10-02-1998', 'Cristobal Colon 18, Centro, Calpulalpan, Tlaxcala', 'Baja'),
    createData('Jose Juan Alvarado García', '30-05-1998', 'Pachuquilla, Hgo', 'Alta')
];

const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
}))(TableCell);
  
const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
}))(TableRow);


const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    root: {
        width: '100%',
        overflowX: 'auto'
    },
    table: {
        minWidth: 'auto',
    },
}));

function ChildrenList(props){
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

    function deleteChild(child) {
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
                    Agregar Niño
                </Button></Link>
            </Grid>
            <Grid container direction="column" justify="center" alignItems="stretch">
                <Grid item xs={12}>
                    <Paper className={classes.root}>
                        <Table stickyHeader className={classes.table} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell align="left">Nombre</TableCell>
                                <TableCell align="left">Fecha Nacimiento</TableCell>
                                <TableCell align="left">Dirección</TableCell>
                                <TableCell align="left">Maldad</TableCell>
                                <TableCell align="left">Editar</TableCell>
                                <TableCell align="left">Eliminar</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.name}>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{row.date_birth}</TableCell>
                                <TableCell align="left">{row.address}</TableCell>
                                <TableCell align="left">{row.evil}</TableCell>
                                <TableCell align="left">
                                    <Link to={`edit-child/${row.name}`}><IconButton aria-label="edit">
                                        <EditIcon fontSize="small" color="primary" />
                                    </IconButton></Link>
                                </TableCell>
                                <TableCell align="left">
                                    <IconButton aria-label="delete" onClick={() => deleteChild(row.name)}>
                                        <DeleteIcon fontSize="small" color="error" />
                                    </IconButton>
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default ChildrenList;