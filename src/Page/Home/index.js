import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

// import CodeMirror from 'react-codemirror';
import {UnControlled as CodeMirror} from 'react-codemirror2'
import "../../../node_modules/codemirror/lib/codemirror.css";
import WithAuthorization from "../../Components/WithAuthorization";
import { db, firebase } from "../../firebase";
import "../../../node_modules/codemirror/lib/codemirror.css"

import { Modal } from '../../Components'

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
  type: '',
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
  }

  componentDidMount() {
    let currentUser = firebase.auth.currentUser.uid
    let snippetsRef = firebase.db.ref( `${currentUser}/snippets` );

    if( this.state.order.indexOf( "title" ) > -1 ){
      snippetsRef = snippetsRef.orderByChild( "title" );
    }
    else {
      snippetsRef = snippetsRef.orderByKey( );
    }

    if( this.state.queryString.length ){
      snippetsRef = snippetsRef.equalTo( this.state.queryString );
    }

    let newItems = [];

    console.log( "setting   " );
    console.log( newItems );

    let currentListener = snippetsRef.on( "value", snapshot => {
      let items = snapshot.val();
      let newItems = [];
      for( var key in items ){
        var item = items[key];
        var newItem = item;
        console.log( "new item pushed" );
        newItems.push( newItem );
      }

      console.log( "setting snippets state" );
      console.log( newItems );

      this.setState({ snippets: newItems });
    });

    
    // this.setState({ currentListener });
  }

  // componentWillUnmount() {
  //   if( typeof this.state.currentListener.off === "function" ){
  //     this.state.currentListener.off();
  //   }
  // }

  removeSnippet(e) {
    if (window.confirm("Are you sure?")) {
      const userid = firebase.auth.currentUser.uid;
      db.deleteSnippet( userid, e.target.id );
    }
  }

  toggleShow() {
    this.setState({ toggleShow: !this.state.toggleShow });
    this.setState({ type: '' });
  }

  snippetChange(editor, data, value){
    this.setState({ snippet: value })
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
      firebase.auth.onAuthStateChanged(user => {
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
          this.setState({ type: "" });
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
    const options = {lineNumbers:true, tabSize:2, readOnly:true, smartIndent: true, mode: "javascript"};
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
              <input type="text" name="querystring" placeholder="Search" onChange={this.handleChange} />
            </div>
            <div className="input">
              <label>DateTime</label>
              <input type="text" name="datetime" placeholder="Datetime" onChange={this.handleChange} />
            </div>
          </div>
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
                    <CodeMirror value={e.snippet} options={options} />
                    <CopyToClipboard text={e.snippet}>
                      <button>Copy</button>
                    </CopyToClipboard>
                    <button data-key={i} id={e.id} onClick={this.removeSnippet}>
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


const authCondition = authUser => !!authUser;

export default WithAuthorization(authCondition)(HomePage);
