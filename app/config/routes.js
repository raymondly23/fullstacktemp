import React from 'react'
import ReactRouter from 'react-router'
const { Route, Router, hasHistory, IndexRoute } = 'ReactRouter'
import Main from '../components/main'

let Routes = <Router>
              <Route path='/' component={Main}/>
             </Router>

export default Routes