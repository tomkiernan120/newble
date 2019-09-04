import React from "react";
// import CodeMirror from 'react-codemirror';

import "../../../node_modules/codemirror/lib/codemirror.css";
import withAuthorization from "../../Components/withAuthorization";
import { db, firebase } from "../../firebase";
import "../../../node_modules/codemirror/lib/codemirror.css"

import { Modal, SnippetGrid, CodeMirrorPart } from '../../Components';

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/css/css');
require('codemirror/mode/go/go');
require('codemirror/mode/htmlmixed/htmlmixed');
require('codemirror/mode/sass/sass');

const INITIAL_STATE = {
  toggleShow: false,
  title: "",
  snippet: "",
  errors: null,
  type: 'javascript',
  order: '',
  queryString: '',
  dateTime: '',
  types: ['javascript','xml','css','go','html', 'php','htmlmixed','sass'],
  snippets: null
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    this.toggleShow = this.toggleShow.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.addSnippet = this.addSnippet.bind(this);
    this.removeSnippet = this.removeSnippet.bind(this);
    this.snippetChange = this.snippetChange.bind(this);
    this.updateSnippets = this.updateSnippets.bind(this);
  }

  componentDidMount() {
    this.updateSnippets();
  }

  updateSnippets() {
    let currentUser = firebase.auth.currentUser.uid
    let snippetsRef = firebase.db.ref( `users/${currentUser}/snippets` );

    let currentListener = snippetsRef.on( "value", snapshot => {
      let items = snapshot.val();
      let newItems = [];
      for( var key in items ){
        var item = items[key];
        var newItem = item;
        newItems.push( newItem );
      }

      this.setState({ snippets: newItems });
    });


    this.setState({ currentListener });
  }

  componentWillUnmount() {
    if( typeof this.state.currentListener.off === "function" ){
      this.state.currentListener.off();
    }
  }

  removeSnippet(e) {
    if (window.confirm("Are you sure?")) {
      const userid = firebase.auth.currentUser.uid;
      db.deleteSnippet( userid, e.target.id );
    }
  }

  toggleShow() {
    this.setState({ toggleShow: !this.state.toggleShow });
  }

  snippetChange( editor, data, value ) {
    this.setState({ snippet: value });
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value }, this.updateSnippets );
  }

  addSnippet(e) {
    if ( !this.state.snippet && !this.state.title ) {

      let string = "";

      if (!this.state.title) {
        string += "Please enter a title\r\n";
      }

      if (!this.state.snippet) {
        string += "Please enter a snippet\r\n";
      }

      this.setState({ errors: string });
    }
    else {
      firebase.auth.onAuthStateChanged( user => {
        if (user) {
          var DT = new Date();
          db.doAddSnippet(
            user.uid,
            this.state.snippet,
            this.state.title,
            this.state.type,
            DT.toString()
          );
          this.setState({ snippet: "" });
          this.setState({ title: "" });
          this.setState({ type: "javascript" });
          this.setState({ toggleShow: false });
        }
        else {
          this.setState({ errors: user.message });
        }
      });
    }
  }

  handleClose(e) {
    this.setState({ toggleShow: false });
  }

  render() {
    const { snippets } = this.state;

    return (
      <main>
        <div className="inner">
          <button className="addtion" onClick={this.toggleShow}>Add Snippet</button>
          <Modal
            addSnippet={this.addSnippet}
            errors={this.state.errors}
            close={this.handleClose}
            toggleShow={this.state.toggleShow}
            handleChange={this.handleChange}
            snippetChange={this.snippetChange}
            currentType={this.state.type}
            title={this.state.title}
            types={this.state.types}
            snippet={this.state.snippet}
          />
          <div className="search-options">
            <div className="input">
              <label>Order</label>
              <select name="order" onChange={this.handleChange}>
                <option value="id">By Id</option>
                <option value="title descending">By Title Descending</option>
                <option value="title ascending">By Title Ascending</option>
              </select>
            </div>
            <div className="input">
              <label>Name</label>
              <input type="text" name="queryString" placeholder="Search" onChange={this.handleChange} />
            </div>
            <div className="input">
              <label>DateTime</label>
              <input type="text" name="datetime" placeholder="Datetime" onChange={this.handleChange} />
            </div>
          </div>
          <div className="snippet-container">
            {snippets && <SnippetGrid snippets={snippets} /> }
          </div>
        </div>
      </main>
    );
  }
}


const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(HomePage);
