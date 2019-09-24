import React, { Component } from 'react'
import Drop from './components/Drop/Drop'

/* stylesheet */
require('./stylesheets/index.css')

export class index extends Component {
 
  render(){
    return (
  
      <div className="AppRoot">
        
        <Drop/>
      </div>       
      
    )
  }
}

export default index
