import React from 'react'
import ReactDOM from 'react-dom'
const routes = require('./config/routes')
const Main = require('./components/main')

ReactDOM.render(
      <Router>
        <Route path='/' component={Main}/>
      </Router>, document.getElementById('app'))