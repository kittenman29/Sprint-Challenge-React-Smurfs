import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link } from "react-router-dom";

import './App.css';
import SmurfForm from './components/SmurfForm';
import Smurfs from './components/Smurfs';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smurfs: [],
    };
  }
  // add any needed code to ensure that the smurfs collection exists on state 
  // and it has data coming from the server
  // Notice what your map function is looping over and returning inside of Smurfs.
  // You'll need to make sure you have the right properties on state and pass them 
  // down to props.

  componentDidMount() {
    axios.get('http://localhost:3333/smurfs')
      .then(res => {
        console.log(res)
        this.setState({smurfs: res.data})
      })
      .catch(err => {
        console.log(err)
      })
  }

  addSmurf = (event, smurf) => {
    event.preventDefault();
    // add code to create the smurf using the api
    console.log(smurf);
    axios.post('http://localhost:3333/smurfs', smurf)
      .then(res => {
        console.log(res)
        this.setState({
          smurfs: res.data
        });
      })
      .catch(err => {
        console.log(err)
      })

    this.setState({
      name: '',
      age: '',
      height: ''
    });
  }

  render() {
    return (
      <div className="App">
        <Link to="/">
          Home 
        </Link>
        <Link to="/smurf-form">
           Add Smurf
        </Link>
        <Route 
          exact
          path="/smurf-form"
          render={props => (
            <SmurfForm
              {...props}
              addSmurf={this.addSmurf}
            />
          )}
        />
        <Route 
          // exact
          path="/"
          render={props => (
            <Smurfs
              {...props}
              smurfs={this.state.smurfs}
            />
          )}
        />
      </div>

      
    );
  }
}

export default App;
