import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch, withRouter, Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import logo from './logo.svg';
import './App.scss';
import SecondPage from './components/secondPage/SecondPage';
import FirstPage from './components/firstPage/FirstPage';
import SalongListPage from './components/main/salongListPage/SalongListPage';
import SalongInfoPage from './components/main/salongInfoPage/SalongInfoPage';

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
          <Link to="/first">First</Link><br />
          <Link to="/second">Second</Link><br />
          <Link to="/salonglist">Salong list</Link><br />
          <Link to="/salonginfo">Salong info</Link>
        </div>*/}
        <Route render={({location}) => (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={{ enter: 300, exit: 300 }}
              classNames={'fade'}
            >
              <Switch location={location}>
              <Route exact path="/first" component={FirstPage} />
                <Route exact path="/second" component={SecondPage} />
                <Route exact path="/salonglist" component={SalongListPage} />
                <Route exact path="/salonginfo" component={SalongInfoPage} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )} />
        {/*<Switch>
            <Route exact path="/salonglist" component={SalongListPage} />
            <Route exact path="/salonginfo" component={SalongInfoPage} />
        </Switch>*/}
      </div>
    );
  }
}

// export default App;

export default withRouter(App);
