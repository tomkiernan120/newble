import React from 'react';

import withAuthorization from '../../Components/withAuthorization'

const HomePage = () => 
  <div>
    <h1>Home Page</h1>
    <p>Only available to logged in users</p>
  </div>


const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage)