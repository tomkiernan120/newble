import React from 'react'

import AuthUserContext from '../AuthUserContext'
import { firebase } from '../../firebase'


const withAuthentication = ( Component ) => {
  class withAuthentication extends React.Component {
    constructor(props){
      super(props)

      this.state = {
        authUser: null
      }
    }

    componentDidMount() {
      firebase.auth.onAuthStateChanged( authUser => {
        authUser 
          ? this.setState({ authUser })
          : this.setState({ authUser: null })
      })
    }

    render() {
      const { authUser } = this.state
      return (
        <AuthUserContext.Provider value={authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      )
    }
  }
  return withAuthentication
}

export default withAuthentication
