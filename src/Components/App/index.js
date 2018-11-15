import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { firebase } from '../../firebase'
import Helmet from 'react-helmet'

import * as routes from '../../Constants/routes'
import Navigation from '../Navigation'
import Footer from '../Footer'
import withAuthentication from '../withAuthentication';


import { LandingPage, SignUpPage, SignIn, Home, Account } from '../../Page'

import 'normalize.css'
import '../../index.scss'

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
    const { authUser } = this.state;
    return (
      <Router>
        <div>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Newble</title>
          </Helmet>
          <header>
            <div className='inner'>
              <h1 className='logo'>newble</h1>
            </div>
          </header>
          <section className='navigation'>
            <div className='inner'>
              <Navigation value={authUser} />
            </div>
          </section>
          <Route exact path={routes.ACCOUNT} component={Account} />
          <Route exact path={routes.LANDING} component={LandingPage} />
          <Route exact path={routes.SIGN_UP} component={SignUpPage} />
          <Route exact path={routes.SIGN_IN} component={SignIn} />
          <Route exact path={routes.HOME} component={Home} />
        </div>
      </Router>
    )
  }
}

export default withAuthentication(App)
