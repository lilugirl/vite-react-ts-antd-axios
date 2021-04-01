import React, { useState } from 'react'
import './App.css';
import routes from './router/routes';
import RouterView from './router'
import {HashRouter as Router} from 'react-router-dom';
 
function App() {
 
  return (
    <div className="App">
      <Router>
          <RouterView routes={routes}/>
      </Router>
    </div>
  )
}

export default App
