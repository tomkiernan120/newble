import React from 'react';
import { firebase } from '../../firebase';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  errors: null,
}

export default class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE};
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    firebase.auth.onAuthStateChanged( user => {
      if( user.displayName ){
        this.setState( {name: user.displayName });
      }      
      if( user.email ){
        this.setState( {email: user.email });
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
      this.setState({errors: errors});
    })

    firebase.auth.currentUser.updateEmail(this.state.password).then(() =>{

    }).catch(errors => {
      this.setState({errors: errors});
    })

    firebase.auth.currentUser.updateProfile({ displayName: this.state.name, photoURL: null }).then(() =>{

    }).catch(errors => {
      this.setState({errors: errors});
    })
  }

  render() {
    return (
      <main>
        <div className='inner'>
          <form onSubmit={this.handleSubmit}>
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
