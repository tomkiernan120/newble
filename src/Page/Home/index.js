import React from 'react';

import withAuthorization from '../../Components/withAuthorization'

// const byPropKey = (propertyName, value) => () => ({
//   [propertyName]: value,
// });

const HomePage = () => 
  <main>
    <div className='inner'>
      <button >Add Snippet</button>
      <Modal />
      <p>Your code Home Page</p>
    </div>
  </main>

const INITIAL_STATE = {
  toggleShow: null,
  snippet: ''
};

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {...INITIAL_STATE}
  }

  render() {
    const { toggleShow, snippet } = this.state
    return (
      <div data-toggle={toggleShow}>
        <div className='modal'>
          <div className='inner'>
            <h1>Add Code Snippet</h1>
            <textarea>{snippet}</textarea>
          </div>
        </div>
      </div>
    );
  }
}


const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(HomePage)