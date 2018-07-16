import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import CommandLine from './components/commandline.jsx';
import Response from './components/response.jsx';

class Pierre extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      outputstring : '',
      inputstring : ''
    };
    this.handleChange = this.handleChange.bind(this)
    this.send = this.send.bind(this); 
  }

  componentDidMount() {
  }

  handleChange(e) {
   
    this.setState({
      inputstring : e.target.value
    }, () =>{console.log(this.state)})
    
  }

  send () {
    //e.stopPropegation()
    var input = JSON.stringify({ string : this.state.inputstring})
    console.log(this.state)
    $.ajax({
      url : "http://localhost:7007/",
      method: "POST",
      data: input,
      dataType: 'json',
      contentType : 'application/json',
      success: (data) => {
        this.setState({
          outputstring : data
        })
      },
      error: (err) => {
        this.setState({
          outputstring : err.responseText

        })
        console.log('I am throwing an error')
        console.log(err)
      }
    })
  }
  
  prep (e) {
    this.setState({
      inputstring : e.target.value
    })
  }

  render () {
    return (
    <div>
      <h1>Last Response</h1>
      <Response displaystring={this.state.outputstring} />
      <h1>New Command</h1>
      <CommandLine send ={this.send} handleChange ={this.handleChange} />
    
      <h1> t()ny syntax </h1> 
      <ul>
        <li> Wrap your commands and arguments in parenthesis</li>
        <li> t()ny has two input types, integers (#) and binary(:)</li>
        <li> t()ny uses yuri as a compiler </li>
        <li> t()ny supports bitwise operators with one arguments </li>
            <li> NOT  ((:value)(~~))</li>
            <li> ID   ((:value)($$))</li>
        
        <li> t()ny supports bitwise operators with two arguments </li>
            <li> AND ((:value)(&&)(:value))</li>
            <li> NAND ((:value)(&~)(:value))</li>
            <li> OR ((:value)(||)(:value))</li>
            <li> NOR ((:value)(|~)(:value))</li>
            <li> XOR ((:value)(|x)(:value))</li>
            <li> XNOR ((:value)(|^)(:value))</li>
      
        <li> t()ny supports fundamental turing operations with no arguments </li>
            <li> read value at location of head ((@$))</li>
            <li> write a one at current head location ((@1))</li>
            <li> write a zero at current head location ((@0))</li>
            <li> move head one space left ((&lt;&lt;))</li>
            <li> move head one space ((&gt;&gt;))</li>
        
        <li>t()ny can handle values less than or equal to 255</li>
      </ul>
    </div>
    )
  }
}

ReactDOM.render(<Pierre />, document.getElementById('pierre'));
