import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      list: [],
      inputValue: ''
    }
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => response.json())
  .then(data => this.setState({list : data}))
  }
  

  handleInputChange=(e)=>{
    this.setState({inputValue: e.target.value})
  };
  handleSubmit=(e)=>{
    e.preventDefault();
    const newList = this.state.list.slice();
    if(this.state.inputValue!==''){
      const newItemObj ={
        "userId": 1,
        "id": newList.length,
        "title": this.state.inputValue,
        "completed": false
      }
      newList.push(newItemObj);
    }
  };
  renderList=()=>{
      return this.state.list.map((item,index)=>{
      if(item !==''){
        return <li><b>{item.title}<IconButton className="deleteButton" onClick={()=>this.deleteListItem(index)}><DeleteIcon/></IconButton></b></li>
      }
      })
  };
  deleteListItem=(index)=>{
    const newList= this.state.list.slice();
    newList.splice(index,1);
    this.setState({list : newList})
  };
  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <form onSubmit={(e)=> this.handleSubmit(e)}>
            <h2>To Do List</h2>
            <input style={{width: "200px", height: "28px"}} value={this.state.inputValue} type="text" onChange={(e)=> this.handleInputChange(e)}></input>
            <Button className="SubmitButton" variant="contained" size="mini" color="primary" type="submit"onClick={this.handleAddToList}>Add to List</Button>
            {this.renderList()}
        </form>
      </div>
    );
  }
}

export default App;
