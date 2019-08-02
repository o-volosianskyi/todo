import React from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';


class Item extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: localStorage.getItem(this.props.id).done,
      text: this.props.txt
    };
    this.checkOut = this.checkOut.bind(this);
    this.removeItem = this.removeItem.bind(this);

  }

  checkOut(){
  
    axios.post(`/items/checkout`, {text: this.state.text})
      .then(res => {
        if( res.status == '200')
          this.setState({checked: true, text: this.state.text});

      });
  }
  
  removeItem(){
    axios.delete(`/items/destroy`, {text: this.state.text})
    .then(res => {
      if( res.status == '200')
        this.setState({checked: true, text: this.state.text});
    });

  }

  itemState(){
    if(this.state.checked){
      var textd = {textDecoration: 'line-through'}
      return(
      <div className="list_item ">
        <div className="text" id="text" style={textd}>{this.props.txt}</div>
        <Button variant="danger" size="sm" className="mybtn" onClick={this.removeItem}>X</Button>
      </div>)
    }else{
      return( 
        <div className="list_item ">
          <InputGroup.Checkbox aria-label="Checkbox for following text input" class="checkb" onChange={this.checkOut}/>
          <div className="text" id="text" >{this.props.txt}</div>
          <Button variant="danger" size="sm" className="mybtn" onClick={this.removeItem}>X</Button>
        </div>)
    }
  }

  render() {
    this.state.checked = this.props.checked;
    this.state.text=this.props.txt;
    return (
      this.itemState()
    )
  }
}

export default Item;
