import React from 'React'
import ReactDOM from 'react-dom'
import WithAuthentication from '../WithAuthentication'

it( 'renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render( <WithAuthentication/>, div );
})