import React from "react";
import { withRouter } from "react-router-dom";

import { SignUPLink } from "../SignUpPage";
import { auth } from "../../firebase";

import * as routes from "../../Constants/routes";

const signInPage = ({ history }) => (
  <main>
    <div className='inner'>
      <div className='signin'>
        <SignInForm history={history} />
        <div className='clear'></div>
        <SignUPLink />
      </div>
    </div>
  </main>
);

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

export class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.onSubmit = this.onSubmit.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
  }


  googleSignIn = event => {
    alert( 'Currently not working.' )

    // const { history } = this.props
    //
    // firebase.auth.signInWithPopup( firebase.provider ).then((result) => {
    //   this.setState({ ...INITIAL_STATE });
    //   history.push(routes.HOME);
    // })
    // .catch((error) => {
    //   this.setState({error:error})
    // })
  }

  onSubmit = event => {
    event.preventDefault();

    const { email, password } = this.state;

    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";
    return (
      <form onSubmit={this.onSubmit}>
        <h2>Sign In</h2>
        {error && <p>{error.message}</p>}
        <input
          value={email}
          onChange={event =>
            this.setState(byPropKey("email", event.target.value))
          }
          type="text"
          placeholder="Email Address"
        />
        <input
          value={password}
          onChange={event =>
            this.setState(byPropKey("password", event.target.value))
          }
          type="password"
          placeholder="Password"
        />
        <button type="submit" disabled={isInvalid} >
          Sign In
        </button>
        <button type="button" onClick={this.googleSignIn}>Alternatively Sign In With Google</button>
        <div className='clear'></div>
      </form>
    );
  }
}

export default withRouter(signInPage);
