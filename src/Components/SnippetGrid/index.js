import React from 'react';

import { Snippet } from '../'

export default class SnippetGrid extends React.Component {
  render() {
    var snippets = this.props.snippets;
    return (
      <React.Fragment>
        {snippets.map( (e, i) => {
          if( e.hasOwnProperty( 'show' ) && e.show === false ) {
            return false;
          }
          return <Snippet removeSnippet={this.props.removeSnippet} key={i} index={i} snippet={e} />
        } )}
      </React.Fragment>
    )
  }
}
