/* DEPENDENCIES */
import React, { Component } from 'react'
import Drop from './components/Drop/Drop'

/* STYLESHEETS */
require('./stylesheets/index.css')


/* INDEX COMPONENT */
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
