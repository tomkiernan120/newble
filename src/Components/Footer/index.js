import React from 'react';

import { Link } from 'react-router-dom'

export default class Footer extends React.Component {
  render () {
    return (
      <footer>
        <div className='inner'>
          <p style={{color: "#fff", textAlign: "center", }}>Made by <Link style={{color:'#fff', fontWeight: 600, textDecoration: 'none'}} to="https://www.tomkiernan.co.uk">Tom Kiernan</Link></p>
        </div>
      </footer>
    );
  }
}
