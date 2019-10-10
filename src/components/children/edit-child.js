import React, { Component } from 'react';
const axios = require('axios');

export default class EditChild extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: props.match.params.id,
            name: null,
            date: null,
            address: null,
            evil: null
        }
        this.edit = this.edit.bind(this);
        this.myName = this.myName.bind(this);
        this.myDate = this.myDate.bind(this);
        this.myAddress = this.myAddress.bind(this);
        this.myEvil = this.myEvil.bind(this);
    }

    componentDidMount(){
        axios.get(`http://localhost:3000/children/${this.state.id}`)
        .then(res => {
            console.log(res.data.children);
            this.setState({
                name: res.data.children.name,
                date: res.data.children.date,
                address: res.data.children.address,
                evil: res.data.children.evil
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    myName(event){
        this.setState({
            name: event.target.value
        });
    }

    myDate(event){
        this.setState({
            date: event.target.value
        });
    }

    myAddress(event){
        this.setState({
            address: event.target.value
        });
    }

    myEvil(event){
        let level;
        if(event.target.value == "1")
            level = false;
        else level = true;
        this.setState({
            evil: level
        });
    }

    edit(){
        console.log(this.state);
    }

    render(){
        return(
            <div className="row">
                <div className="col s12 l8 offset-l2">
                    <div className="row">
                        <div className="input-field col s12 l9">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="name" type="text" className="validate" value={this.state.name} onChange={this.myName} />
                            <label className="active" htmlFor="name">Name</label>
                        </div>
                        <div className="input-field col s12 l3">
                            <i className="material-icons prefix">calendar_today</i>
                            <input id="date_birth" type="date" className="validate" value={this.state.date} onChange={this.myDate} />
                            <label className="active" htmlFor="date_birth">Date Birth</label>
                        </div>
                        <div className="input-field col s12 l10">
                            <i className="material-icons prefix">house</i>
                            <input id="address" type="text" className="validate" value={this.state.address} onChange={this.myAddress} />
                            <label className="active" htmlFor="address">Address</label>
                        </div>
                        <div className="input-field col s12 l2">
                            <label className="active">Level of Evil</label>
                            <select className="browser-default" onChange={this.myEvil}>
                                <option disabled defaultValue>Level of Evil</option>
                                <option value="1">Low</option>
                                <option value="2">High</option>
                            </select>
                        </div>
                    </div>
                    <a className="waves-effect waves-light btn right" onClick={this.edit}><i className="material-icons left">save</i>Save</a>
                </div>
            </div>
        )
    }
}