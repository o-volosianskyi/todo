import React from 'react';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Item from './Item'
import axios from 'axios';

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
    
    document.getElementById("btn").onclick= ()=>{
      if(!this.isExisting(document.getElementById("it").value)){
        document.getElementById("it").placeholder = "Item to do";
        var item1 = {text: document.getElementById("it").value, done:false };
        
        axios.post(`/items/create`, item1)
          .then(res => {
            if(res.status == "200"){
              this.state.items.push(<Item txt={document.getElementById("it").value} key={Math.random()}/>);
            }
          });

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

  sync() {
    axios.get(`/items/index`, {msg: "read"})
      .then(res => {
        this.setState({items: res.items});
      });
  }

  async(){
    setTimeout(()=>{
      this.setState({items: []});
      this.sync();
    }, 100);
  }

  isExisting(item_value){
    axios.get(`/items/show`, {text: item_value})
      .then(res => {
        if( res.item != null)
          return true;
      });
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