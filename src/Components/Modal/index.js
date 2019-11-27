import React from 'react';

import AceEditor from "react-ace";

import 'brace/ext/language_tools';
import 'brace/theme/github';

import "ace-builds/src-noconflict/mode-jsx";
const languages = [
  "javascript",
  "java",
  "python",
  "xml",
  "ruby",
  "sass",
  "markdown",
  "mysql",
  "json",
  "html",
  "handlebars",
  "golang",
  "csharp",
  "elixir",
  "typescript",
  "css"
];

languages.forEach(lang => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});



export default class Modal extends React.Component {
  render() {
    if (this.props.toggleShow) {
      document.body.style.overflow = "hidden";
    } 
    else {
      document.body.style.overflow = "";
    }

    const options = { smartIndent: true, lineNumbers:true, mode: "javascript", readOnly: false }

    if( this.props.type ){
      options.mode = this.props.type;
    }

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
            <AceEditor
              placeholder="Code Here..."
              mode="javascript"
              theme="github"
              onChange={this.props.handleCodeChange}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                tabSize: 2,
              }}
            />
            <button onClick={this.props.addSnippet}>Add Snippet</button>
          </div>
        </div>
      </div>
    );
  }
}
