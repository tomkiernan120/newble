import React from "react";
import Helmet from 'react-helmet';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

// import CodeMirror from 'react-codemirror';

import withAuthorization from "../../Components/withAuthorization";
import { db, firebase } from "../../firebase";

import { Modal, SnippetGrid } from '../../Components';

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
  snippets: null,
  from: undefined,
  to: undefined,
};

class HomePage extends React.Component {
  static defaultProps = {
    numberOfMonths: 2,
  };
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
    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
  }

  componentDidMount() {
    this.updateSnippets();
  }

  handleDayClick(day) {
    const range = DateUtils.addDayToRange(day, this.state);
    this.setState(range);
  }

  handleResetClick() {
    this.setState(this.getInitialState());
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

        if( this.state.queryString ) {
          var itemstring = JSON.stringify( newItem );
          if( itemstring.toLowerCase().indexOf( this.state.queryString.toLowerCase() ) > -1 ) {
            newItem.show = true;
          }
          else {
            newItem.show = false;
          }
        }

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
    const { snippets, from, to } = this.state;

    const modifiers = { start: from, end: to };

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
              <DayPicker
                className="Selectable"
                numberOfMonths={this.props.numberOfMonths}
                selectedDays={[from, { from, to }]}
                modifiers={modifiers}
                onDayClick={this.handleDayClick}
              />
            </div>
            <Helmet>
              <style>{`
              .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                background-color: #f0f8ff !important;
                color: #4a90e2;
              }
              .Selectable .DayPicker-Day {
                border-radius: 0 !important;
              }
              .Selectable .DayPicker-Day--start {
                border-top-left-radius: 50% !important;
                border-bottom-left-radius: 50% !important;
              }
              .Selectable .DayPicker-Day--end {
                border-top-right-radius: 50% !important;
                border-bottom-right-radius: 50% !important;
              }
            `}</style>
          </Helmet>
          </div>
          <div className="snippet-container">
            {snippets && <SnippetGrid removeSnippet={this.removeSnippet} snippets={snippets} /> }
          </div>
        </div>
      </main>
    );
  }
}


const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(HomePage);
