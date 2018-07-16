import React from 'react';


class CommandLine extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      
    }
    this.submitHandler = this.submitHandler.bind(this)
   }
  
submitHandler(e) {
  e.preventDefault();
  // props.send()
  console.log(this.props)
  this.props.send()

}

  
  render () {
    return (
      <div>
        <form onSubmit={this.submitHandler} >
        <input type="text" onChange={this.props.handleChange} />
        <input type="submit"/>
        </form>
      </div>
    )
  }

}

export default CommandLine;