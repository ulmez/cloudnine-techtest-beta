import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import SalongListPage from './components/main/salongListPage/SalongListPage';
import SalongInfoPage from './components/main/salongInfoPage/SalongInfoPage';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div>
        <Route render={({location}) => (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout={{ enter: 300, exit: 300 }}
              classNames={'fade'}
            >
              <Switch location={location}>
                <Route exact path="/salonglist" component={SalongListPage} />
                <Route exact path="/salonginfo" component={SalongInfoPage} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )} />
      </div>
    );
  }
}

export default withRouter(App);
