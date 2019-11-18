import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
  }));

function CreateLetter(props) {
    const classes = useStyles();
    const [age, setAge] = React.useState('');
  
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
      setLabelWidth(inputLabel.current.offsetWidth);
    }, []);
  
    const handleChange = event => {
      setAge(event.target.value);
    };
    return(
        <div className="row">
            <Menu />
            <Grid container direction="column" justify="center" alignItems="flex-start">
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                    Niño
                    </InputLabel>
                    <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={age}
                    onChange={handleChange}
                    labelWidth={labelWidth}
                    >
                    <MenuItem value="">
                        <em>Selecciona un niño</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </div>
    );
}

export default CreateLetter;