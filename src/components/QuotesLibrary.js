import React, { Component } from 'react'
import Relay from 'react-relay'

import Quote from './Quote'

class QuotesLibrary extends Component {
  constructor(){
    super()
    this.state = {
      quotesLibrary: {
        allQuotes: []
      }
    }
  }

  componentDidMount(){
    fetch(`/graphql?query={
      quotesLibrary {
          allQuotes {
          id,
          text,
          author
        }
      }
      
    }`)
    .then(response => response.json())
    .then(json => { 
      console.log(json.data)
      return this.setState(json.data)
    })
    .catch(ex => console.error(ex))

    console.log(
      Relay.QL `query AllQuotes {
        quotesLibrary {
          allQuotes {
            id,
            text,
            author
          }
        }
      }`
    )
  }
  render(){
    console.log(this.state)
    return (
      <div>
        { this.state.quotesLibrary.allQuotes.map((quote,index) =>
          <Quote key={index} quote={quote} />
        )}
      </div>
    )
  }
}

QuotesLibrary = Relay.createContainer(
  QuotesLibrary,
  {
    fragments: {
      
    }
  }
)

export default QuotesLibrary