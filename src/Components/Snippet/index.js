import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

// import CodeMirror from 'react-codemirror';
import {UnControlled as CodeMirror} from 'react-codemirror2'

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

    const options = {lineNumbers:true, tabSize:2, readOnly:true, smartIndent: true, mode: "javascript"};

    return (
      <React.Fragment>
        <div key={this.props.index} className="snippet">
          <div className="heading">
            <p>
              <strong>{this.props.snippet.title}</strong>
            </p>
            <p>{this.props.snippet.time}</p>
          </div>
          <CodeMirror value={this.props.snippet.snippet} options={options} />
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
