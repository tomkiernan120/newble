import React from 'react';

import CodeMirror from 'codemirror';

import 'codemirror/lib/codemirror.css';

export default class CodeMirrorPart extends React.Component {
  constructor( props ) {
      super(props);

      this.myRef = React.createRef();

      this.options = {
        value: this.props.value || '',
        mode: this.props.mode || 'javascript',
        indentUnit: this.props.indentUnit || 2,
        tabSize: this.props.tabSize || 2,
        lineNumbers: this.props.lineNumbers || true,
        readOnly: this.props.readOnly || false
      }


      console.log( props );

      this.options = { ...this.options, ...this.props.options };
  }

  componentDidMount() {
    CodeMirror( this.myRef.current, this.options );
  }

  render() {
    return (
      <div ref={this.myRef}></div>
    )
  }
}
