import React from 'react'
import { withRouter } from 'react-router-dom'

import AuthUserContext from './AuthUserContext'
import { firebase } from '../firebase'
import * as routes from '../Constants/routes'

const withAuthorization = (authCondition) => (Component) => {
  class withAuthorization extends React.Component {
    componentDidMount () {
      firebase.auth.onAuthStateChanged(authUser => {
        if (!authCondition(authUser)) {
          this.props.history.push(routes.SIGN_IN)
        }
      })
    }

    render () {
      return (
        <AuthUserContext.Consumer>
          {authUser => authUser ? <Component {...this.props} /> : null }
        </AuthUserContext.Consumer>
      )
    }
  }
  return withRouter(withAuthorization)
}

export default withAuthorization
