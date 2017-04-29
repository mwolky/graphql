import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Relay from 'react-relay'

import QuotesLibrary from './QuotesLibrary'

class App extends Component {
  static defaultProps = {
    greeting: 'Hello'
  };
  render(){
    return (
      <QuotesLibrary />
    )
  }
}

class AppRoute extends Relay.Route {
  static routeName = 'App'
}

ReactDOM.render(
  <Relay.RootContainer 
    Component={ QuotesLibrary }
    route={ new AppRoute() }
  />, 
  document.querySelector('#react')
)