import React, { Component } from 'react'
import path  from 'path'
import Drop from './components/Drop/Drop'
import Dropzone from 'react-dropzone'

require('./index.css')

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
