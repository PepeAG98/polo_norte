import React, { Component, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import Button from '@material-ui/core/Button';
import swal from 'sweetalert';
import Menu from '../menu';
const axios = require('axios');

/*class CreateLetter extends Component {
    constructor(props){
        super(props);
        this.state = {
            children: [],
            child: '',
            date_letter: '',
            gifts: []
        }
        this.save = this.save.bind(this);
        this.myChild = this.myChild.bind(this);
        this.myDate = this.myDate.bind(this);
        this.addGifts = this.addGifts.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:3000/children/')
        .then(res => {
            console.log(res.data.children);
            this.setState({
                children: res.data.children
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    save(){

    }

    myChild(){

    }

    myDate(){

    }

    addGifts(){

    }

    render(){
        return(
            <div className="row">
                <div className="col s12 l8 offset-l2">
                    <div className="row">
                    <div className="input-field col s12 l9">
                    <select className="browser-default">
                        <option value="" disabled selected>Choose your name</option>
                        {this.state.children.map((child, index) => {
                            return <option key={index} value={child._id}>{child.name}</option>;
                        })}
                    </select>
                    </div>
                        <div className="input-field col s12 l3">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="date" type="date" className="validate" onChange={this.myDate} />
                            <label htmlFor="date">Date Letter</label>
                        </div>
                        <div className="input-field col s12 l12">
                            <div className="row">
                                <div className="input-field col s11">
                                    <i className="material-icons prefix">shopping_basket</i>
                                    <input id="gift" type="text" className="validate" onChange={this.addGifts} />
                                    <label htmlFor="date">Gift</label>
                                </div>
                                <div className="input-field col s1">
                                    <a class="btn-floating waves-effect waves-light red"><i class="material-icons">add</i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}*/

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 300,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    textField: {
        marginLeft: 10
    },
    fab: {
        margin: theme.spacing(1),
      }
  }));

function Gift(){
    const classes = useStyles();
    return(
        <Grid container direction="row" justify="center" alignItems="center">
            <Grid item xs={11}>
                <TextField
                    fullWidth
                    id="outlined-basic"
                    className={classes.textField}
                    label="Regalo"
                    margin="normal"
                    variant="outlined"
                    onChange={this.props.addGift}
                />
            </Grid>
            <Grid item xs={1} style={{paddingLeft: 15}}>
            <Fab color="primary" aria-label="add" className={classes.fab}>
                <AddIcon />
            </Fab>
            </Grid>
        </Grid>
    );
}

function CreateLetter(props) {
    const classes = useStyles();
    const [children, setChildren] = useState([]);
    const [child, setChild] = useState('');
    let [gifts, setGifts] = useState([]);
    let numGifts = 1;
  
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    useEffect(() => {
        setLabelWidth(inputLabel.current.offsetWidth);
        axios.get('https://santa-api-ldaw.herokuapp.com/children')
        .then(res => {
            setChildren(res.data.result);
        })
    }, []);

    function save() {
        if(child == "") 
            swal("Error", "Selecciona un niño para continuar", "error");
        console.log(child);
    }

    return(
        <div className="row">
            <Menu />
            <Grid container direction="column" justify="center" alignItems="flex-start">
                <Grid item xs={12}>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                        Niño
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={child}
                            onChange={(e) => setChild(e.target.value)}
                            labelWidth={labelWidth}
                            >
                            {children.map((child, index) => {
                                return(
                                    <MenuItem key={index} value={child._id}>{child.name}</MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
                {
                    //Aqui van los inputs
                }
            </Grid>
            <Grid container direction="column" justify="flex-end" alignItems="flex-end">
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    className={classes.button}
                    startIcon={<DoneIcon />}
                    onClick={save}
                >
                    Agregar Carta
                </Button>
            </Grid>
        </div>
    );
}

export default CreateLetter;