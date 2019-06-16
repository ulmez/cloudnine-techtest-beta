import React, { Component } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      testValue: ''
    };
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_URL}/tests`)
    .then((result) => {
      console.log(result.data[0].kul);
      this.setState({
        testValue: result.data[0].kul
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          Database value: {this.state.testValue}
        </header>
      </div>
    );
  }
}

export default App;
