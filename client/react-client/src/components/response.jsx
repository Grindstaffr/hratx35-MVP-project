import React from 'react'


class Response extends React.Component {
  constructor (props){
    super(props)
  }
  
  render (props) {
    return (
      <div> {this.props.displaystring} </div>
      
    )
  }

}

export default Response;