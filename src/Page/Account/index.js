import React from 'react';
import { firebase } from '../../firebase';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  errors: null,
  success: null
}

export default class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    this.setState({ success: false })
    firebase.auth.onAuthStateChanged( user => {
      if( user ){
        if( user.displayName ){
          this.setState( {name: user.displayName });
        }      
        if( user.email ){
          this.setState( {email: user.email });
        }
      }
    })
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value })
  }

  handleSubmit(e){
    e.preventDefault();
    firebase.auth.currentUser.updateEmail(this.state.email).then(() =>{

    }).catch(errors => {
            console.log( errors );
    })

    firebase.auth.currentUser.updatePassword(this.state.password).then(() =>{

    }).catch(errors => {
      console.log( errors );
      // this.setState({errors: errors});
    })

    firebase.auth.currentUser.updateProfile({ displayName: this.state.name, photoURL: null }).then(() =>{

    }).catch(errors => {
      console.log( errors );
      // this.setState({errors: errors});
    })

    if( !this.state.errors ){
      this.setState({ success: true });
    }

  }

  render() {
    const { success, errors } = this.state
    return (
      <main>
        <div className='inner'>
          <form onSubmit={this.handleSubmit}>
            <h1>Update Account</h1>
            {this.state.success && <p>Your updates have been saved</p> }
            {errors && <p>{errors}</p>}
            <label>Name</label>
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
            <label>Email</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />            
            <label>Password</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
            <button type='submit'>Save Changes</button>
          </form>
        </div>
      </main>
    );
  }
}
