import React from 'react';
import uuid from 'uuid'

import withAuthorization from '../../Components/withAuthorization'

import { db, firebase } from '../../firebase'

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  toggleShow: false,
  snippet: '',
  errors: null,
  snippets: null
};


class HomePage extends React.Component {
  constructor (props){
    super(props)

    this.state = {...INITIAL_STATE}
    this.toggleShow = this.toggleShow.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.addSnippet = this.addSnippet.bind(this)
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(( user ) => {
      if( user ){
        const snippets = db.getSnippets( user.uid )
        let newState = []
        snippets.once('value', (snapshot) => {
          let newState = []
          let items = snapshot.val();
          for( let item in items ){
            newState.push( items[item] );
          }
        })
        this.setState({
          snippets: newState
        })
      }
    })
  }

  toggleShow() {
    this.setState({ toggleShow: !this.state.toggleShow })
  }

  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }

  addSnippet(e){
    if( !this.state.snippet ){
      this.setState({ errors: 'Please enter a snippet' });
    }
    else {
      firebase.auth.onAuthStateChanged(( user ) => {
        if( user ){
          var DT = new Date();
          db.doAddSnippet( user.uid, this.state.snippet, DT.toString() )
          this.setState({ snippet: '' })
          this.setState({ toggleShow: false })
        }
        else {
          this.setState( { errors: user.message } )
        }
      })
    }
  }

  handleClose(e){
    this.setState({ toggleShow: false })
  }

  render () {
    const { snippets } = this.state
    return (
      <main>
        <div className='inner'>
          <button onClick={this.toggleShow} >Add Snippet</button>
          <Modal addSnippet={this.addSnippet} errors={this.state.errors} close={this.handleClose} toggleShow={this.state.toggleShow} handleChange={this.handleChange} snippet={this.state.snippet} />
          {snippets && snippets.map((i,e) => {
            return(
              <div className='snippet'>
              </div>
            )
          })}
        </div>
      </main>
    )
  }
} 


class Modal extends React.Component {

  render() {

    if( this.props.toggleShow ){
      document.body.style.overflow = 'hidden';
    }
    else {
      document.body.style.overflow = '';
    }

    return (
      <div data-toggle={this.props.toggleShow}>
        <div className="overlay" onClick={this.props.close}></div>
        <div className='modal'>
          <div className='inner'>
            <h1>Add Code Snippet</h1>
            {this.props.errors && <p>{this.props.errors}</p>}
            <textarea onChange={this.props.handleChange} name='snippet' value={this.props.snippet}></textarea>
            <button onClick={this.props.addSnippet}>Add Snippet</button>
          </div>
        </div>
      </div>
    );
  }
}


const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage)