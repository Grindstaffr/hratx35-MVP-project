import React from 'react';


class CommandLine extends React.Component {
  constructor (props){
    super(props)
    this.state = {
      
    }
   }
  

  
  render () {
    return (
      <div>
        <form onSubmit={this.props.send} >
        <input type="text" onChange={this.props.handleChange} />
        <input type="submit"/>
        </form>
      </div>
    )
  }

}

export default CommandLine;