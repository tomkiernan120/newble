import React from 'react'
import ReactDOM from 'react-dom'
import SignOutButton from '../SignOut'

it( 'renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render( <SignOutButton/>, div );
})