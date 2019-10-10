import React, { Component } from 'react';
const axios = require('axios');

export default class CreateChild extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            date_birth: '',
            address: '',
            evil: false
        }
        this.save = this.save.bind(this);
        this.myName = this.myName.bind(this);
        this.myDate = this.myDate.bind(this);
        this.myAddress = this.myAddress.bind(this);
        this.myEvil = this.myEvil.bind(this);
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

    save(){
        console.log(this.state);
        axios.post('http://localhost:3000/children', {
            name: this.state.name,
            date_birth: this.state.date,
            address: this.state.address,
            evil: this.state.evil
          })
          .then(res => {
              console.log(res);
              window.alert("Children Added");
              this.props.history.push(`/children-list`);
          })
          .catch(err => {
              console.log(err);
              window.alert("Error");
          });
    }

    render(){
        return(
            <div className="row">
                <div className="col s12 l8 offset-l2">
                    <div className="row">
                        <div className="input-field col s12 l9">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="name" type="text" className="validate" onChange={this.myName} />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="input-field col s12 l3">
                            <i className="material-icons prefix">calendar_today</i>
                            <input id="date_birth" type="date" className="validate" onChange={this.myDate} />
                            <label htmlFor="date_birth">Date Birth</label>
                        </div>
                        <div className="input-field col s12 l10">
                            <i className="material-icons prefix">house</i>
                            <input id="address" type="text" className="validate" onChange={this.myAddress} />
                            <label htmlFor="address">Address</label>
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
                    <a className="waves-effect waves-light btn right" onClick={this.save}><i className="material-icons left">save</i>Save</a>
                </div>
            </div>
        )
    }
}