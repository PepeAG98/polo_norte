import React, { Component, useState, useEffect } from 'react';
import '../styles/children-list.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Menu from '../menu';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
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
import Typography from '@material-ui/core/Typography';
import swal from 'sweetalert';
const Snow = require('react-snow-effect');
const axios = require('axios');

class ChildrenList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount(){
        axios.get('https://santa-api-ldaw.herokuapp.com/children')
        .then(res => {
            this.setState({
                data: res.data.result
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    componentDidUpdate() {
        axios.get('https://santa-api-ldaw.herokuapp.com/children')
        .then(res => {
            this.setState({
                data: res.data.result
            });
        })
        .catch(err => {
            console.log(err);
            this.props.history.push('/children-list');
        });
    }

    delete(child){
        swal({
            title: "¿Quieres eliminar a este niño?",
            text: "Una vez que lo elimines no podrás recuperar la información",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                axios.delete(`https://santa-api-ldaw.herokuapp.com/children/${child}`)
                .catch(() => {
                    axios.get('https://santa-api-ldaw.herokuapp.com/letter')
                    .then(res => {
                        let toDelete = res.data.result.find(lett => lett.children == child);
                        if(toDelete){
                            axios.delete(`https://santa-api-ldaw.herokuapp.com/letter/${toDelete._id}`)
                            .catch(()=> {
                                swal("Información eliminada", {
                                    icon: "success",
                                });
                            });
                        }
                    });
                });
            } else {
              swal("Eliminación Cancelada");
            }
        });
    }

    render(){
        return(
            <div className="main">
                <Snow />
                <Menu />
                <Grid container direction="column" justify="flex-end" alignItems="flex-end">
                    <Link to="/create-child"><Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{margin: 20}}
                        startIcon={<AddIcon />}
                    >
                        Agregar Niño
                    </Button></Link>
                </Grid>
                <Grid container direction="column" justify="center" alignItems="stretch">
                    <Grid item xs={12}>
                        <Paper style={{width: '100%', overflowX: 'auto'}}>
                            <Table stickyHeader style={{minWidth: 'auto'}} aria-label="simple table">
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
                                {this.state.data.length ? this.state.data.map((row, index) => {
                                    return(
                                        <TableRow key={index}>
                                            <TableCell align="left">{row.name}</TableCell>
                                            <TableCell align="left">{row.date_birth}</TableCell>
                                            <TableCell align="left">{row.address}</TableCell>
                                            <TableCell align="left">{row.evil ? 'Alta': 'Baja'}</TableCell>
                                            <TableCell align="left">
                                                <Link to={`edit-child/${row._id}`}><IconButton aria-label="edit">
                                                    <EditIcon fontSize="small" color="primary" />
                                                </IconButton></Link>
                                            </TableCell>
                                            <TableCell align="left">
                                                <IconButton aria-label="delete" onClick={() => this.delete(row._id)}>
                                                    <DeleteIcon fontSize="small" color="error" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                }): <TableRow><TableCell><Typography variant="h4" gutterBottom>No hay niños</Typography></TableCell></TableRow>}
                                </TableBody>
                            </Table>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
export default ChildrenList;