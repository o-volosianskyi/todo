import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Item from './Item'

class Input extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
    this.async = this.async.bind(this);
  }

  componentDidMount(){
    this.sync();
    this.setState({items: this.state.items});
    document.getElementById("btn").onclick= ()=>{
      if(!this.isExisting(document.getElementById("it").value)){
        document.getElementById("it").placeholder = "Item to do";
        var item1 = JSON.stringify({val: document.getElementById("it").value, done:false });
        if( (localStorage.getItem('last') == undefined) ||  (localStorage.getItem('last') == -1)) {
          localStorage.setItem(0,item1);
          localStorage.setItem('last',0);
          this.sync("");
          this.clearField();
        }else{
          let current = +localStorage.getItem('last')+1;
          localStorage.setItem(current, item1);
          localStorage.setItem('last',current);
          this.sync("");
          this.clearField();
        }
        this.setState({items: this.state.items});
      }else{ //exists
        this.clearField();
        document.getElementById("it").placeholder = "This feature already exists";
      }
    }
    this.itemListeners();
  }

  componentDidUpdate(){
    this.itemListeners();
  }

  itemListeners(){
    var buttons = document.getElementsByClassName("mybtn");
    var checkboxes = document.getElementsByClassName("checkb");
    if(buttons[0] != undefined ){ //eventListener
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', this.async);
      }
    }
    if(checkboxes[0] != undefined ){ //eventListener
      for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('click', this.async);
      }
    }
  }

  sync(item) {
    if (item != undefined) {
      this.state.items.push(<Item id={localStorage.getItem('last')} txt={JSON.parse(localStorage.getItem(localStorage.getItem('last'))).val} key={Math.random()}/>);
      
    }else{
      if((localStorage.getItem('last') != undefined) &&  (localStorage.getItem('last') != -1)) {
        for (let i = 0; i <= localStorage.getItem('last'); i++) {
          if (localStorage.getItem(i) != null) 
          this.state.items.push(<Item id={i} txt={JSON.parse(localStorage.getItem(i)).val} checked={JSON.parse(localStorage.getItem(i)).done} key={Math.random()}/>);
        } 
      }
    }
  }

  async(){
    setTimeout(()=>{
      this.setState({items: []});
      if((localStorage.getItem('last') != undefined) &&  (localStorage.getItem('last') != -1)) {
        for (let i = 0; i <= localStorage.getItem('last'); i++) {
          if (localStorage.getItem(i) != null) 
          this.state.items.push(<Item id={i} txt={JSON.parse(localStorage.getItem(i)).val} checked={JSON.parse(localStorage.getItem(i)).done} key={Math.random()}/>);
        } 
      }else if(localStorage.getItem('last') == -1) {
        this.setState({items: []});
      }
      if(this.state.items != undefined){
        this.setState({items: this.state.items});
      }else{
        this.setState({items: []});
      }
    }, 100);
  }

  isExisting(item_value){
    if((localStorage.getItem('last') != undefined) &&  (localStorage.getItem('last') != -1)){
      for (let i = 0; i <= localStorage.getItem('last'); i++) {
        if (localStorage.getItem(i) != null) {
          if(JSON.parse(localStorage.getItem(i)).val === item_value){
            return true;
          }
        }
      }
    }
    return false; 
  }

  clearField(){
    document.querySelector("#it").value = '';
  }

  handleChange(){
    this.setState({items: this.state.items});
  }
  render() {
    return (
    <div>
      <InputGroup className="mb-3">
        <FormControl
          id="it"
          placeholder="Item to do"
          aria-label="Item to do"
          aria-describedby="basic-addon2"
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" id="btn">Add</Button>
        </InputGroup.Append>
        
      </InputGroup>
      <div onChange={this.handleChange.bind(this)}>
        {this.state.items.map(item => (
          item
          ))}
      </div>
    </div>
    )
  }
}

export default Input;