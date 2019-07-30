import React from 'react';
import Navig from './Navig'
import Container from './Container'

class App extends React.Component {
  render(){
    return <div className="app">
      <Navig />
      <Container />
    </div>
  }
}

export default App;
