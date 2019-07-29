import React from 'react';
import Input from './Input'

class Container extends React.Component {
  componentDidMount(){
  }

  render(){
  return <div className="cont">
      <div className="todo justify-content-start align-items-center">
        <Input />
        
      </div>
    </div>
  }
}

export default Container;
