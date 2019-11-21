import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';
import Menu from '../menu';
import Paper from '@material-ui/core/Paper';
import swal from 'sweetalert';
const axios = require('axios');
const Snow = require('react-snow-effect');

export default class EditLetter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            child: '',
            date_letter: '',
            gifts: [],
            nameChild: ''
        }
        this.finder = this.finder.bind(this);
        this.edit = this.edit.bind(this);
        this.addNew = this.addNew.bind(this);
        this.myGift = this.myGift.bind(this);
        this.delete = this.delete.bind(this);
    }

    componentDidMount() {
        axios.get(`https://santa-api-ldaw.herokuapp.com/letter/${this.state.id}`)
        .then(res => {
            this.setState({
                child: res.data.letter.children,
                gifts: res.data.letter.gifts 
            });
        });
    }

    edit(){
        console.log(this.state.gifts);
    }

    addNew(){
        this.setState({
            gifts: [...this.state.gifts, '']
        });
    }

    myGift(event, indice) {
        this.state.gifts[indice] = event.target.value;
    }

    finder(child){
        let target;
        axios.get(`https://santa-api-ldaw.herokuapp.com/children`)
        .then(res => {
            console.log(res.data.result);
            target = res.data.result.forEach(find => {
                if(find._id == child) 
                    target = find.name;
            });
        });
        console.log(target);
        return target;
    }

    delete(gift){
        this.setState({
            gifts: this.state.gifts.filter(gft => gft != gift)
        });
    }

    render(){
        return(
            <div className="main">
                <Snow />
                <Menu />
                <Grid container direction="column" justify="center" alignItems="stretch">
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom>{this.state.child}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            style={{margin: 20}}
                            startIcon={<AddIcon />}
                            onClick={this.addNew}
                        >
                            Agregar Regalo
                        </Button>
                    </Grid>
                    <Paper style={{margin: 20, background: '#eee', padding: 10}}>
                    {this.state.gifts.map((gift, ind) => {
                        return(
                            <div key={ind}>
                                <Grid container direction="row" justify="center" alignItems="center">
                                    <Grid item xs={11} style={{paddingRight: 20, paddingLeft: 20}} key={ind}>
                                        <TextField
                                            fullWidth
                                            id="outlined-basic"
                                            label="Regalo"
                                            margin="normal"
                                            variant="outlined"
                                            value={gift}
                                            style={{width: '100%'}}
                                            onChange={(e) => this.myGift(e, ind)}
                                        />
                                    </Grid>
                                    <Grid item xs={1} style={{paddingLeft: 15}}>
                                        <Fab color="secondary" aria-label="add" style={{margin: 10}} onClick={() => this.delete(gift)}>
                                            <DeleteIcon />
                                        </Fab>
                                    </Grid>
                                </Grid>
                            </div>
                        );
                    })}
                    </Paper>
                    <Grid container direction="column" justify="flex-end" alignItems="flex-end">
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            style={{margin: 10}}
                            startIcon={<DoneIcon />}
                            onClick={this.edit}
                        >
                            Editar Carta
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}