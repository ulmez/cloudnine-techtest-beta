import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import logo from './logo.svg';
import './App.scss';
import SecondPage from './components/secondPage/SecondPage';
import FirstPage from './components/firstPage/FirstPage';
import SalongListPage from './components/main/salongListPage/SalongListPage';

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
      <div>
        {/*<div>
          <Link to="/">First</Link><br />
          <Link to="/second">Second</Link>
        </div>
        <Route render={({location}) => (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={{ enter: 300, exit: 300 }}
              classNames={'fade'}
            >
              <Switch location={location}>
                  <Route exact path="/" component={FirstPage} />
                  <Route exact path="/second" component={SecondPage} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )} />*/}
        <Switch>
            <Route exact path="/salonglist" component={SalongListPage} />
        </Switch>
      </div>
    );
  }
}

// export default App;

export default withRouter(App);
