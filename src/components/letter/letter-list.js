import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Menu from '../menu';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import swal from 'sweetalert';
const axios = require('axios');
const Snow = require('react-snow-effect');

class LetterList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            letters: [],
            children: [],
            christmas: false
        }
        this.delete = this.delete.bind(this);
        this.finder = this.finder.bind(this);
    }

    componentDidMount() {
        axios.get('https://santa-api-ldaw.herokuapp.com/letter')
        .then(res => {
            this.setState({
                letters: res.data.result
            });
        })
        .catch(err => {
            console.log(err);
        });

        axios.get('https://santa-api-ldaw.herokuapp.com/children')
        .then(res => {
            this.setState({
                children: res.data.result
            });
        })
        .catch(err => {
            console.log(err);
        });
        const currentDay = new Date().getUTCDate();
        const currentMonth = new Date().getMonth();
        const currentHour = new Date().getUTCHours();
        if(currentMonth == 10){
            if(currentDay == 21){
                if(currentHour >= 10)
                    this.setState({christmas: true});
            }
            else if(currentDay == 22) {
                if(currentHour <= 23)
                    this.setState({christmas: true});
            }
        }
    }

    componentDidUpdate() {
        axios.get('https://santa-api-ldaw.herokuapp.com/letter')
        .then(res => {
            this.setState({
                letters: res.data.result
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    finder(child){
        let target;
        this.state.children.forEach(find => {
            if(find._id == child) 
                target = find.name;
        });
        return target;
    }

    delete(letter){
        swal({
            title: "¿Quieres eliminar esta carta?",
            text: "Una vez que lo elimines no podrás recuperar la información",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
                axios.delete(`https://santa-api-ldaw.herokuapp.com/letter/${letter}`)
                .catch(err => {
                    swal("Información eliminada", {
                        icon: "success",
                    });
                })
            } else {
              swal("Eliminación Cancelada");
            }
        });
    }

    render() {
        
        return(
            <div className="main">
                <Snow />
                <Menu />
                <Grid container direction="column" justify="flex-end" alignItems="flex-end">
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        style={{margin: 20}}
                        startIcon={<AddIcon />}
                        disabled={this.state.christmas}
                        onClick={() => this.props.history.push('/create-letter')}
                    >
                        Agregar Carta
                    </Button>
                </Grid>
                <Grid container direction="column" justify="center" alignItems="stretch">
                    <Grid item xs={12}>
                        {this.state.letters.length ? this.state.letters.map((lett, index) => {
                            return(
                                <div style={{width: '100%'}} key={index}>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        >
                                        <Typography>{this.finder(lett.children)}</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                        <div>
                                            <List dense={true}>
                                                {lett.gifts.map((gift, ind) => {
                                                    return(
                                                        <ListItem key={ind}>
                                                            <ListItemAvatar>
                                                                <Avatar>
                                                                <CardGiftcardIcon />
                                                                </Avatar>
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary={gift}
                                                            />
                                                        </ListItem>
                                                    );
                                                })}
                                            </List>
                                        </div>
                                        <Grid container direction="row" justify="flex-end" alignItems="flex-end">
                                            <IconButton aria-label="delete" color="secondary" style={{margin: 10}} onClick={() => this.delete(lett._id)} disabled={this.state.christmas}>
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                            <IconButton aria-label="delete" color="primary" style={{margin: 10}} disabled={this.state.christmas} onClick={() => this.props.history.push(`/edit-letter/${lett._id}`)}>
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Grid>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                </div>
                            );
                        }): <Typography variant="h4" gutterBottom>No hay cartas</Typography>}
                    </Grid>
                </Grid>
            </div>
        );
    }

}

export default LetterList;