import React, { Component } from 'react'
import Relay from 'react-relay'

class Quote extends Component {
  render(){
    return (
      <div>
        <h4>{ this.props.quote.text }</h4>
        <p>{ this.props.quote.author }</p>
      </div>
    )
  }
}

Quote = Relay.createContainer(Quote,{
  fragments: {}
})

export default Quote