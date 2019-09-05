import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import { auth } from '../../firebase'

import * as routes from '../../Constants/routes'

const SignUpPage = ({ history }) =>
  <main>
    <div className='inner'>
      <SignUpForm history={history} />
    </div>
  </main>

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
}

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends React.Component {
  constructor(props){
    super(props)

    this.state = { ...INITIAL_STATE }
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit = ( event ) => {
    event.preventDefault();
    const {
      email,
      passwordOne
    } = this.state

    if( !email || !passwordOne ){
      this.setState({ error: { message: "Email or password cannot be blank" } });
    }

    const { history } = this.props

    auth.doCreateUserWithEmailAndPassword( email, passwordOne )
      .then( authUser => {
        this.setState( { ...INITIAL_STATE } );
        history.push( routes.HOME )
      })
      .catch( error => {
        this.setState( byPropKey( 'error', error ) );
      });
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '' || email === '' || username === ''

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={username}
          onChange={event => this.setState(byPropKey('username', event.target.value))}
          type="text"
          placeholder="Full Name"
        />
        <input
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={passwordOne}
          onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <input
          value={passwordTwo}
          onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>
        <div className="clear"></div>
        { error && <p>{error.message}</p> }
      </form>
    )
  }
}

const SignUPLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default withRouter(SignUpPage)

export { SignUpForm, SignUPLink }
