import React, { Component, useState, useEffect } from 'react';
import Menu from '../menu';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import swal from 'sweetalert';
import Cookies from 'universal-cookie';
const axios = require('axios');
const cookies = new Cookies();

class CreateChild extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            date: '2019-01-01',
            address: '',
            evil: false
        }
        this.myName = this.myName.bind(this);
        this.myDate = this.myDate.bind(this);
        this.myAddress = this.myAddress.bind(this);
        this.save = this.save.bind(this);
    }

    componentDidMount(){
        if(cookies.get('isLogin') != "true"){
            swal("Usuario no valido", "Por favor ingresa al sistema", "error")
            .then(() => {
                this.props.history.push('/');
            });
        }
    }

    myName(event) {
        this.setState({
            name: event.target.value
        });
    }

    myDate(event) {
        let bornYear = event.target.value.slice(0,4);
        if(Number(new Date().getFullYear())-Number(bornYear) < 2) {
            swal("Vuelve pronto", "Aún no puede pedir regalos", "error")
            .then(() => {
                this.props.history.push('/children-list');
            });
        }
        else if(Number(new Date().getFullYear())-Number(bornYear) > 11) {
            swal("Tú sabes el secreo", "Ya no estas en edad para pedir regalos", "error")
            .then(() => {
                this.props.history.push('/children-list');
            });
        }
        else{
            this.setState({
                date: event.target.value
            });
        }
    }

    myAddress(event) {
        this.setState({
            address: event.target.value
        });
    }

    save() {
        if(this.state.name == '' || this.state.date == '' || this.state.address == '' ) {
            swal("Error", "No puede haber ningún campo en blanco", "error");
        } else {
            axios.post('https://santa-api-ldaw.herokuapp.com/children', {
            name: this.state.name,
            date_birth: this.state.date,
            address: this.state.address,
            evil: this.state.evil
          })
          .then(res => {
              if(this.state.evil === true) {
                axios.post(`https://santa-api-ldaw.herokuapp.com/letter`,{
                    children: res.data.children._id,
                    date_of_letter: `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`,
                    gifts: ['Carbon']
                });
                }
                swal("Niño Agregado", `${this.state.name} ha sido agregado`, "success")
                .then(() => {
                    this.props.history.push('/children-list')
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
                <Menu />
                <Grid container direction="column" justify="center" alignItems="center">
                    <Typography variant="h3" gutterBottom>
                        Registrar Niño
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Por favor introduce los datos siguientes:
                    </Typography>
                </Grid>
                <Paper style={{margin: 20, background: '#eee', padding: 10}}>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item xs={12} lg={12} style={{paddingRight: 20, paddingLeft: 20}}>
                        <TextField
                            required
                            fullWidth
                            id="name"
                            label="Nombre"
                            margin="normal"
                            variant="outlined"
                            onChange={this.myName}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} style={{paddingRight: 40, paddingLeft: 0, paddingTop: 15}}>
                        <TextField
                            fullWidth
                            id="date"
                            label="Fecha Nacimiento"
                            type="date"
                            defaultValue={this.state.date}
                            variant="outlined"
                            style={{addingRight: 20, paddingLeft: 20}}
                            onChange={this.myDate}
                        />
                    </Grid>
                    <Grid item xs={12} md={7} style={{addingRight: 20, paddingLeft: 20}}>
                        <TextField
                            required
                            fullWidth
                            id="address"
                            label="Dirección"
                            margin="normal"
                            variant="outlined"
                            onChange={this.myAddress}
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
                    <Button variant="contained" color="primary" style={{margin: 20}} onClick={this.save}>
                        Registrar
                    </Button>
                </Grid>
            </div>
        );
    }
}

export default CreateChild;