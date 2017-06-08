import React from 'react';
import NavBar from './NavBar';

const App = (props) => (
  <div className='appComp'>
    <NavBar />
    <div>
      <h1>This is our app component</h1>
      {props.children}
    </div>
  </div>
)

export default App;
