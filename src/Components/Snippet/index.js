import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

// import CodeMirror from 'react-codemirror';
import {UnControlled as CodeMirror} from 'react-codemirror2'

export default class index extends React.Component {
  constructor(props) {
    super(props);
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
          <CopyToClipboard text={this.props.snippet.snippet}>
            <button>Copy</button>
          </CopyToClipboard>
          <button data-key={this.props.index} id={this.props.snippet.index} onClick={this.props.removeSnippet}>
            Delete
          </button>
        </div>
      </React.Fragment>
    );
  }
}
