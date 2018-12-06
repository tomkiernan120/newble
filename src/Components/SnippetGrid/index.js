import React from 'react';

import { Snippet } from '../'

export default class SnippetGrid extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    var snippets = this.props.snippets;
    var columns = 3;

    var rows = snippets.map( (e, i) => {
      return <div className='column'><Snippet snippet={e} index={i} /></div>
    }).reduce((r , element, index) => {
      index % columns === 0 && r.push([]);
      r[r.length-1].push( element );
      return r;
    }, []).map( ( e, i ) => {
      return <div className='row'>{e}</div>
    }); 

    return (
      <React.Fragment>
        {rows}
      </React.Fragment>
    )
  }
}
