import React from 'React'
import ReactDOM from 'react-dom'
import WithAuthorization from '../WithAuthorization'

it( 'renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render( <WithAuthorization/>, div );
})