import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

// import {CodeMirrorReact as CodeMirror } from '../../Components';

import CodeMirror from 'react-codemirror';
import "../../../node_modules/codemirror/lib/codemirror.css";

import WithAuthorization from "../../Components/WithAuthorization";


import { db, firebase } from "../../firebase";

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/css/css');
require('codemirror/mode/go/go');
require('codemirror/mode/htmlmixed/htmlmixed');
require('codemirror/mode/sass/sass');

// import "../../../node_modules/codemirror/lib/codemirror.css"

const INITIAL_STATE = {
  toggleShow: false,
  title: "",
  snippet: "",
  errors: null,
  type: '',
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
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        const itemsRef = db.getSnippets(user.uid);
        itemsRef.on("value", snapshot => {
          let items = snapshot.val();
          let newState = [];
          for (let item in items) {
            newState.push({
              id: item,
              title: items[item].title,
              snippet: items[item].snippet,
              time: items[item].time
            });
            this.setState({
              snippets: newState
            });
          }
        });
      }
    });
  }

  removeSnippet(e) {
    if (window.confirm("Are you sure?")) {
      const userid = firebase.auth.currentUser.uid;
      db.deleteSnippet(userid, e.target.id);
    }
  }

  toggleShow() {
    this.setState({ toggleShow: !this.state.toggleShow });
    this.setState({ type: '' });
  }

  snippetChange(value){
    this.setState({ snippet: value })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  addSnippet(e) {
    if (!this.state.snippet && !this.state.title) {
      let string = "";
      if (!this.state.title) {
        string += "Please enter a title\r\n";
      }
      if (!this.state.snippet) {
        string += "Please enter a snippet\r\n";
      }
      this.setState({ errors: string });
    } else {
      firebase.auth.onAuthStateChanged(user => {
        if (user) {
          var DT = new Date();
          db.doAddSnippet(
            user.uid,
            this.state.snippet,
            this.state.title,
            DT.toString()
          );
          this.setState({ snippet: "" });
          this.setState({ title: "" });
          this.setState({ toggleShow: false });
        } else {
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
    const options = {lineNumbers:true, tabSize:2, readOnly:true};
    return (
      <main>
        <div className="inner">
          <button onClick={this.toggleShow}>Add Snippet</button>
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
          <div className="snippet-container">
            {snippets &&
              snippets.map((e, i) => {
                return (
                  <div key={i} className="snippet">
                    <div className="heading">
                      <p>
                        <strong>{e.title}</strong>
                      </p>
                      <p>{e.time}</p>
                    </div>  
                    <CodeMirror options={options} />
                    <CopyToClipboard text={e.snippet}>
                      <button>Copy</button>
                    </CopyToClipboard>
                    <button id={e.id} onClick={this.removeSnippet}>
                      Delete
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </main>
    );
  }
}

class Modal extends React.Component {

  render() {
    if (this.props.toggleShow) {
      document.body.style.overflow = "hidden";
    } 
    else {
      document.body.style.overflow = "";
    }

    const options = { smartIndent: true, lineNumbers:true }

    if( this.props.type ){
      options.mode = this.props.type;
    }

    console.log( options );

    return (
      <div data-toggle={this.props.toggleShow}>
        <div className="overlay" onClick={this.props.close} />
        <div className="modal">
          <div className="inner">
            <h1>Add Code Snippet</h1>
            {this.props.errors && <p>{this.props.errors}</p>}
            <label>Title</label>
            <input
              onChange={this.props.handleChange}
              type="text"
              name="title"
              value={this.props.title}
            />
            <label>Type</label>
            <select name="type" onChange={this.props.handleChange} value={this.props.currentType}>
              {this.props.types.map((e,i) => {
                return <option key={i} value={e}>{e}</option>
              })}
            </select>
            <label>Snippet</label>
            <CodeMirror name="popup" options={options} style={{float:'left'}} onChange={this.props.snippetChange} name="snippet" value={this.props.snippet} id="popup" />
            <button onClick={this.props.addSnippet}>Add Snippet</button>
          </div>
        </div>
      </div>
    );
  }
}

const authCondition = authUser => !!authUser;

export default WithAuthorization(authCondition)(HomePage);
