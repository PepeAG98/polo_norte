import React, { Component, useState, useEffect } from 'react';
import Menu from '../menu';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import swal from 'sweetalert';
import Paper from '@material-ui/core/Paper';
const Snow = require('react-snow-effect');
const axios = require('axios');

class EditChild extends Component{
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            name: '',
            date: '2019-01-01',
            address: '',
            evil: false
        }
        this.handleName = this.handleName.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleAddress = this.handleAddress.bind(this);
        this.handleEvil = this.handleEvil.bind(this);
        this.edit = this.edit.bind(this);
    }

    componentDidMount() {
        axios.get(`https://santa-api-ldaw.herokuapp.com/children/${this.state.id}`)
        .then(res => {
            this.setState({
                name: res.data.children.name,
                date: res.data.children.date_birth,
                address: res.data.children.address,
                evil: res.data.children.evil
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    handleName(event) {
        this.setState({
            name: event.target.value
        });
    }

    handleDate(event) {
        this.setState({
            date: event.target.value
        });
    }

    handleAddress(event) {
        this.setState({
            address: event.target.value
        });
    }

    handleEvil(event) {
        this.setState({
            evil: event.target.value
        });
    }

    edit() {
        if(this.state.name == '' || this.state.date == '' || this.state.address == '') {
            swal("Error", "Ningún dato puede estar en blanco", "error");
        } else {
            axios.put(`https://santa-api-ldaw.herokuapp.com/children/${this.state.id}`, {
                name: this.state.name,
                date_birth: this.state.date,
                address: this.state.address,
                evil: this.state.evil
              })
              .then(res => {
                  swal("Información Actualizada", `Los datos de ${this.state.name} se han actualizado`, "success")
                  .then(() => {
                    this.props.history.push('/children-list')
                  })
              })
        }
    }

    render() {
        return(
            <div className="main">
            <Snow />
            <Menu />
            <Grid container direction="column" justify="center" alignItems="center">
                <Typography variant="h3" gutterBottom>
                    {this.state.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Por favor introduce los datos siguientes:
                </Typography>
            </Grid>
            <Paper style={{margin: 20, background: '#eee', padding: 10}}>
            <Grid container direction="row" justify="center" alignItems="center">
                <Grid item xs={12} lg={12} style={{paddingRight: 20, paddingLeft: 20, paddingTop: 15}}>
                    <TextField
                        required
                        fullWidth
                        id="name"
                        value={this.state.name}
                        label="Nombre"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleName}
                    />
                </Grid>
                <Grid item xs={12} md={4} style={{paddingRight: 40, paddingLeft: 20, paddingTop: 15}}>
                    <TextField
                        fullWidth
                        id="date"
                        value={this.state.date}
                        label="Fecha Nacimiento"
                        type="date"
                        defaultValue={this.state.date}
                        variant="outlined"
                        onChange={this.handleDate}
                    />
                </Grid>
                <Grid item xs={12} md={7} style={{paddingRight: 40, paddingLeft: 20, paddingTop: 10}}>
                    <TextField
                        required
                        fullWidth
                        id="address"
                        value={this.state.address}
                        label="Dirección"
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleAddress}
                    />
                </Grid>
                <Grid item xs={12} md={1}>
                    <Grid container direction="column" justify="center" alignItems="center">
                        <Grid item xs={12}>
                            <span>Maldad</span>
                        </Grid>
                        <Grid item xs={12}>
                            <Checkbox
                                checked={this.state.evil}
                                onChange={() => this.setState({evil: !this.state.evil})}
                                color="primary"
                                inputProps={{
                                'aria-label': 'Maldad',
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            </Paper>
            <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="center"
            >
                <Button variant="contained" color="primary" onClick={this.edit} style={{margin: 20}}>
                    Editar
                </Button>
            </Grid>
        </div>
        );
    }
}
export default EditChild;