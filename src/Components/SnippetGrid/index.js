import React from 'react';

import { Snippet } from '../'

export default class SnippetGrid extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    var snippets = this.props.snippets;
    return (
      <React.Fragment>
        {snippets.map( (e, i) => { return <Snippet key={i} index={i} snippet={e} /> } )}
      </React.Fragment>
    )
  }
}
