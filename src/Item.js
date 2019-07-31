import React from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

class Item extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: localStorage.getItem(this.props.id).done,
      id: this.props.id,
      text: this.props.txt
    };
    this.checkOut = this.checkOut.bind(this);
    this.removeItem = this.removeItem.bind(this);

  }

  checkOut(){
    var item1 = JSON.stringify({val: this.props.txt, done:true });
    localStorage.setItem(this.props.id, item1);
    this.setState({checked: localStorage.getItem(this.props.id).done, id: this.state.id, text: this.state.text});
  }
  
  removeItem(){
    var flag = false;
    if( (localStorage.getItem('last') == this.props.id) && (this.props.id != 0) ){
      for (let i = 1; i <= localStorage.getItem('last'); i++) {
        if(localStorage.getItem(this.props.id-i) != undefined){
          flag = true;
          localStorage.setItem('last', this.props.id-i)
          break;
        }
      }
      if(!flag){
        console.log("ITS !0 & ITS LAST");
        localStorage.setItem('last', -1)  
      }
    }
    if( (this.props.id == 0) && (localStorage.getItem('last') === this.props.id)){
      console.log("ITS 0 & ITS LAST");
      localStorage.setItem('last', -1)
    }
    localStorage.removeItem(this.props.id);
    this.setState({checked: true, id: this.state.id, text: this.state.text});

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
          <InputGroup.Checkbox aria-label="Checkbox for following text input" onChange={this.checkOut}/>
          <div className="text" id="text" >{this.props.txt}</div>
          <Button variant="danger" size="sm" className="mybtn" onClick={this.removeItem}>X</Button>
        </div>)
    }
  }

  render() {
    this.state.checked = this.props.checked;
    this.state.id=this.props.id;
    this.state.text=this.props.txt;
    return (
      this.itemState()
    )
  }
}

export default Item;
