/* DEPENDENCIES */
import React, { Component} from 'react'
import FileDrop from 'react-file-drop'
import path from 'path'
import axios from "axios";

/*  STYLESHEETS */
require('../../stylesheets/Drop.css')


/*  <Drop /> COMPONENT */
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
        FileDroped: false,
      })
    }, 2000);
    

  }
  handleDrop = (files, event) => {

    /* EXTENSION FILTER */
    const FileInfo = {ext: ''}

    if (path.extname(files[0].name) === ".png")
    {
      FileInfo.ext = ".png"; 
    }
    else if (path.extname(files[0].name) === ".jpg")
    {
      FileInfo.ext = ".jpg"; 
    }
    else if (path.extname(files[0].name) === ".gif") 
    {
      FileInfo.ext = ".gif"; 
    }
    else if (path.extname(files[0].name) === ".jpeg") 
    {
      FileInfo.ext = ".jpeg"; 
    }
    else
    {
        console.error("File not supported.");
        this.ShowMessage("Images only!")
        return;
    }
    
    this.setState({
        MouseOver: false,
        DragText: "Uploading...",
        FileDroped: true,
    })
    
    setTimeout(() => {
      console.log('Uploading...')
    }, 2000);


    /* UPLOAD REQUEST TO API */
    const formData = new FormData()
    formData.append("file", files[0])
    axios.post('http://localhost:8080/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
    })
    .then((res) => {

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
    .catch((err) => {
      
       return this.ShowMessage("Fail :(")

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
              this.state.FileDroped
              ?
              'linear-gradient(to top left, #EEAD92, #6018DC)'
              :
              'linear-gradient(to top left, #736EFE, #5EFCE8)'
          },
          sucesso: {
            background: 
              'linear-gradient(to top left, #81FBB8, #28c76f)' 
          }

      }

    
    return (
      
      <FileDrop 
      onDragLeave={this.handleDragLeave} 
      onDragOver={this.handleDragOver} 
      onDrop={this.handleDrop}>

        <div style={this.state.Success ? dropStyle.sucesso : dropStyle.normal } className="DropContainerRoot"> 
          
            <h1>
              img<span>up</span>
            </h1>

            <h3>
              {this.state.DragText}
            </h3>

            <br/>

            {
            this.state.Success 
            ? 
              <p className="successUrl">
                <a 
                  href={this.state.Success ? this.state.SuccessUrl : ""}>{this.state.Success ? this.state.SuccessUrl : ""}
                </a>
              </p>
            : 
            <p></p>
            }
            
            </div>
      
      </FileDrop>
    )
  }
}

export default Drop
