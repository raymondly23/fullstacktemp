import React from 'react'
import ReactRouter from 'react-router'
const { Route, Router, hasHistory, IndexRoute } = 'ReactRouter'
import Main from '../components/main'

const routes =  (
      <Router>
        <Route path='/' component={Main}/>
      </Router>
    )

module.exports = routes