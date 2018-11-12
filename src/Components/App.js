import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { firebase } from '../firebase'

import * as routes from '../Constants/routes'
import Navigation from './Navigation'

import { LandingPage, SignUpPage, SignIn, Home } from '../Page'

import 'normalize.css'
import '../index.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      authUser: false
    }
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({authUser})
        : this.setState({authUser: null});
    })
  }

  render() {
    return (
     <Router>
      <div>
        <Navigation authUser={this.state.authUser} />
        
        <Route exact path={routes.LANDING} component={LandingPage} />
        <Route exact path={routes.SIGN_UP} component={SignUpPage} />
        <Route exact path={routes.SIGN_IN} component={SignIn} />
        <Route exact path={routes.HOME} component={Home} />
      </div>
     </Router>
    );
  }
}

export default App;
