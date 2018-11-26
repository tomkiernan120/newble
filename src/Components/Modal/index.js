import React from 'react';

import {Controlled as CodeMirror} from 'react-codemirror2'

export default class Modal extends React.Component {
  constructor(props){
    super(props)

    console.log( props );

  }

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
            <CodeMirror name="popup" options={options} style={{float:'left',width:'100%'}} onChange={( editor, data, value ) => {  console.log( arguments ) }} name="snippet" value={this.props.snippet} id="modal-popup" />
            <button onClick={this.props.addSnippet}>Add Snippet</button>
          </div>
        </div>
      </div>
    );
  }
}