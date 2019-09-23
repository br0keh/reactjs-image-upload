import React, { Component, useCallback} from 'react'
import FileDrop from 'react-file-drop'
import path from 'path'
import axios from "axios";
import { join } from 'upath';
const fs = require('browserify-fs')


require('./Drop.css')




export class Drop extends Component {
  constructor(){
    super();

    this.state = {
      MouseOver: false,
      DragText: "Drop image here to upload.",
      Success: false,
      SuccessUrl: "",
      FileDroped: false,
    }
    this.handleDrop = this.handleDrop.bind(this)
    this.ShowMessage = this.ShowMessage.bind(this)
  
  }
  ShowMessage(newMessage){
    this.setState({
      DragText: newMessage,
    })

    setTimeout(() => {
      this.setState({
        DragText: "Drop image here to upload.",
      })
    }, 2000);
    

  }
  handleDrop = (files, event) => {

    if (path.extname(files[0].name) !== ".png" | ".jpg" | ".gif" 
       ) {
        console.error("File not supported.");
        this.ShowMessage("Only images!!")
        return;
       }
    
    this.setState({
        MouseOver: false,
        DragText: "Uploading...",
        FileDroped: true,
    })
    
      // POST to a test endpoint for demo purposes
    const formData = new FormData();
    formData.append("file", files[0]);
    axios.post('http://localhost:8080/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
    })
    .then((res) => {

      if(res.status !== 200) {
        
        return this.ShowMessage("Fail :(");

      }
      if(res.data.success) {
        console.log(res.data)
        this.setState({
          DragText: "Success :)", 
          Success: true,
          SuccessUrl: res.data.url,
    
        })
      } else {

      }
      
    })
  
   
    
  }

  handleDragOver = (event) => {
    this.setState({
      MouseOver: true,
      DragText: "Drop!",
    })
  }

  handleDragLeave = (event) => {
    this.setState({
      MouseOver: false,
      DragText: "Drop image here to upload."
    })
  }

  render() {

        const dropStyle =
        { 
          normal: {
            background: 
            this.state.FileDroped ?
            'linear-gradient(to top left, #EEAD92, #6018DC)'
            :
            'linear-gradient(to top left, #736EFE, #5EFCE8)'
          },
          sucesso: {
            background: 'linear-gradient(to top left, #81FBB8, #28c76f)' 
          }

      }

    
    return (
      
      <FileDrop 
      onDragLeave={this.handleDragLeave} 
      onDragOver={this.handleDragOver} 
      onDrop={this.handleDrop}>

        <div style={this.state.Success ? dropStyle.sucesso : dropStyle.normal } className="DropContainerRoot"> 
          
          <h1>img<span>up</span></h1>{"\n"}
          <h3>{this.state.DragText}</h3>
          <br/>
          <p><a href={this.state.Success? this.state.SuccessUrl : ""}>{this.state.Success ? this.state.SuccessUrl : ""}</a></p>
        </div>
      
      </FileDrop>
    )
  }
}

export default Drop
