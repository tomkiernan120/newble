import React from 'react'

import AuthUserContext from './AuthUserContext'
import firebase from '../firebase'


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
      return (
        <Component {...this.props} />
      )
    }
  }
  return withAuthentication
}

export default withAuthentication
