import React, { Component, useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import Menu from '../menu';
import Paper from '@material-ui/core/Paper';
import Cookies from 'universal-cookie';
const axios = require('axios');
const cookies = new Cookies();

class CreateLetter extends Component {
    constructor(props){
        super(props);
        this.state = {
            children: [],
            child: '',
            date_letter: '',
            gifts: [''],
            lettNew: null
        }
        this.save = this.save.bind(this);
        this.myChild = this.myChild.bind(this);
        this.addGifts = this.addGifts.bind(this);
        this.myGift = this.myGift.bind(this);
        this.isNew = this.isNew.bind(this);
    }

    componentDidMount(){
        if(cookies.get('isLogin') != "true"){
            swal("Usuario no valido", "Por favor ingresa al sistema", "error")
            .then(() => {
                this.props.history.push('/');
            });
        }
        axios.get('https://santa-api-ldaw.herokuapp.com/children')
        .then(res => {
            this.setState({
                children: res.data.result
            });
        })
        .catch(err => {
            console.log(err);
        });
        let myDate = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`;
        this.setState({
            date_letter: myDate
        });
    }

    isNew(child) {
        let r;
        axios.get(`https://santa-api-ldaw.herokuapp.com/letter`)
        .then(res => {
            r = res.data.result.filter(lett => lett.children == child);
        });
    }

    save(){
        if(this.state.child == '' || this.state.date_letter == '' || !this.state.gifts.every(gft => gft != ""))
            swal("Error", "Ningun campo debe estar vacio", "error");
        else {
            /*let changeLetter = false;
            axios.get(`https://santa-api-ldaw.herokuapp.com/letter`)
            .then(res => {
                res.data.result.forEach(lett => {
                    if(lett.children == this.state.child) {
                        //changeLetter = true;
                        axios.put(`https://santa-api-ldaw.herokuapp.com/letter/${lett._id}`, {
                            gifts: lett.gifts.concat(this.state.gifts)
                        })
                        .then(res => {
                            swal("Carta Agregada", "La carta ha sido agregada", "success")
                            .then(() => {
                                this.props.history.push('/letter-list')
                            })
                          })
                          .catch(err => {
                              console.log(err);
                              swal("Error", "Por favor revisa tus datos", "error");
                          });
                    } 
                })
            });
            if(changeLetter == false){
                axios.post('https://santa-api-ldaw.herokuapp.com/letter', {
                    children: this.state.child,
                    date_of_letter: this.state.date_letter,
                    gifts: this.state.gifts
                })
                .then(res => {
                    swal("Carta Agregada", "La carta ha sido agregada", "success")
                    .then(() => {
                        this.props.history.push('/letter-list')
                    })
                })
                .catch(err => {
                    console.log(err);
                    swal("Error", "Por favor revisa tus datos", "error");
                });
            }*/
            if(this.state.lettNew) {
                if(this.state.lettNew.gifts.includes('Carbon')) {
                    axios.put(`https://santa-api-ldaw.herokuapp.com/letter/${this.state.lettNew._id}`, {
                        date_of_letter: this.state.date_letter,
                        gifts: this.state.gifts
                    })
                    .then(res => {
                        swal("Carta Agregada", "Tu carta ha sido enviada a Santa Claus", "success")
                        .then(() => {
                            this.props.history.push('/letter-list')
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        swal("Error", "Por favor revisa tus datos", "error");
                    });
                } else {
                    axios.put(`https://santa-api-ldaw.herokuapp.com/letter/${this.state.lettNew._id}`, {
                        date_of_letter: this.state.date_letter,
                        gifts: this.state.lettNew.gifts.concat(this.state.gifts)
                    })
                    .then(res => {
                        swal("Carta Agregada", "La carta ha sido agregada", "success")
                        .then(() => {
                            this.props.history.push('/letter-list')
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        swal("Error", "Por favor revisa tus datos", "error");
                    });
                }
            } else {
                axios.post('https://santa-api-ldaw.herokuapp.com/letter', {
                    children: this.state.child,
                    date_of_letter: this.state.date_letter,
                    gifts: this.state.gifts
                })
                .then(res => {
                    swal("Carta Agregada", "La carta ha sido agregada", "success")
                    .then(() => {
                        this.props.history.push('/letter-list')
                    })
                })
                .catch(err => {
                    console.log(err);
                    swal("Error", "Por favor revisa tus datos", "error");
                });
            }
        }
    }

    myChild(event){
        let theChild = this.state.children.find(child => child._id == event.target.value)
        if(theChild.evil == true) {
            swal("Niño Malo", "Regresa cuando tu conducta haya mejorado", "error")
            .then(()=> {
                this.props.history.push('/letter-list');
            });
        }
        else {
            this.setState({
                child: event.target.value
            });
        }
        let r;
        axios.get(`https://santa-api-ldaw.herokuapp.com/letter`)
        .then(res => {
            r = res.data.result.filter(lett => lett.children == event.target.value);
            if(r.length){
                console.log('Ya tiene carta');
                this.setState({
                    lettNew: r[0]
                });
            }
        });
    }

    addGifts(){
        this.setState({
            gifts: [...this.state.gifts, '']
        })
    }

    myGift(event, indice) {
        this.state.gifts[indice] = event.target.value;
    }

    render(){
        return(
            <div className="row">
                <Menu />
                <Paper style={{margin: 20, background: '#eee', padding: 10}}>
                <Grid container direction="column" justify="center" alignItems="flex-start">
                    <Grid item xs={12}>
                        <FormControl variant="outlined" style={{margin: 10, minWidth: 300}}>
                            <InputLabel id="demo-simple-select-outlined-label">
                            Niño
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                onChange={this.myChild}
                                >
                                {this.state.children.map((child, index) => {
                                    return(
                                        <MenuItem key={index} value={child._id}>{child.name}</MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                    </Grid>
                    {this.state.gifts.map((gift, ind) => {
                        return(
                            <div key={ind}>
                                <Grid container direction="row" justify="center" alignItems="center">
                                    <Grid item xs={11} style={{paddingRight: 20, paddingLeft: 20, width: '100%'}} key={ind}>
                                        <TextField
                                            fullWidth
                                            id="outlined-basic"
                                            label="Regalo"
                                            margin="normal"
                                            variant="outlined"
                                            style={{width: '100%'}}
                                            onChange={(e) => this.myGift(e, ind)}
                                        />
                                    </Grid>
                                    <Grid item xs={1} style={{paddingLeft: 15}}>
                                        <Fab color="primary" aria-label="add" style={{margin: 10}} onClick={this.addGifts}>
                                            <AddIcon />
                                        </Fab>
                                    </Grid>
                                </Grid>
                            </div>
                        );
                    })}
                
                <Grid container direction="column" justify="flex-end" alignItems="flex-end">
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{margin: 10}}
                        startIcon={<DoneIcon />}
                        onClick={this.save}
                    >
                        Agregar Carta
                    </Button>
                </Grid>
            </Grid>
            </Paper>
        </div>
        );
    }
}
export default CreateLetter;