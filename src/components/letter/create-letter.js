import React, { Component } from 'react';
const axios = require('axios');

export default class CreateLetter extends Component {
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
}