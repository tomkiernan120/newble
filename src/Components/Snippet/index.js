import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import AceEditor from "react-ace";

import 'brace/ext/language_tools';
import 'brace/theme/github';

export default class index extends React.Component {
  constructor(props) {
    super(props);

    this.state = { copied: false };

    this.onCopy = this.onCopy.bind(this);
  }

  onCopy() {
    this.setState({ copied: true });
    setTimeout( function(){
      this.setState({ copied: false });
    }.bind( this ), 500 );
  }

  render() {
    console.log( this.props.snippet );
    return (
      <React.Fragment>
        <div key={this.props.index} className="snippet">
          <div className="heading">
            <p>
              <strong>{this.props.snippet.title}</strong>
            </p>
            <p>{this.props.snippet.time}</p>
          </div>
          <AceEditor
           placeholder="Code Here..."
           theme="github"
           value={this.props.snippet.snippet}
           mode={this.props.snippet.type}
           setOptions={{
             enableBasicAutocompletion: true,
             enableLiveAutocompletion: true,
             tabSize: 2,
           }}
          />
          <CopyToClipboard onCopy={this.onCopy} text={this.props.snippet.snippet}>
            <button>
              <span className={this.state.copied ? "response show" : "response" }>Copied</span>
              Copy
            </button>
          </CopyToClipboard>
          <button data-key={this.props.index} id={this.props.snippet.index} onClick={this.props.removeSnippet}>
            Delete
          </button>
        </div>
      </React.Fragment>
    );
  }
}
