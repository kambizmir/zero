import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
//import { CircularProgress } from 'material-ui/Progress';

import {getInstance, pushButton} from './api.js';

class PButton extends Component{

  constructor(props){
    super(props);
    this.clickHandler = this.clickHandler.bind(this);  
    this.state = {instanceName:"", busy:false};
  }

  componentDidMount() {
    this.getButton();
  }

	clickHandler(){
    this.pushButton();
	}

  render(){

      var topStyle = {
        position:"relative",
        overflow:"hidden"
   
      }
      var contentStyle = {
        padding:"5px",
        paddingLeft:"20px",
        paddingRight:"20px",
      }

      var overlayStyle = {
        position:"absolute",
        backgroundColor: "rgba(0,0,0,0.4)",
        zIndex: 2,
        width:"100%",
        height : "100%",
        display: "none",
        justifyContent: "center",
        alignItems: "center",
      }

      overlayStyle.display = this.state.busy? "flex" : "none";
   
      return (      
      	
          <div style={topStyle}>

             <div style={overlayStyle}>
             {/* <CircularProgress  /> */}
            </div>

            <div style={contentStyle}>  
            
           
            <Button raised color="primary" onClick = {this.clickHandler}> 
               {/* {this.state.instanceName} */}
               {this.props.item.instancename}
            </Button>
            
            <br/>
                        
            </div>
            {/*<Icon style={iconStyle} color="primary" >settings</Icon> */}
          </div>         
            
      ) 
   
  }

  getButton(){

    

    this.setState({busy:true});
    getInstance(this.props.access_token,this.props.item.instanceid).then(
      (res) => {        
        this.setState({busy:false
        });
      }
    );

      // var socketid = this.props.socket? this.props.socket.id : "";

      // var componentReference = this;  

      // componentReference.setState({busy:true})
      
      // var google_token = componentReference.props.google_token;
      // var userId = componentReference.props.userId;
      // var instanceId = componentReference.props.item.instanceid;    
      // var url = "/buttons/button?access_token=" + google_token + "&userId=" + userId + "&instanceId=" +instanceId + "&socketid=" + socketid;  

      // fetch(url,{ credentials: 'include' }).then(function(response){
      //   return response.json()
      // }).then(function(jsonData){

      //     //console.log(jsonData)
      //     componentReference.setState({busy:false})
      //     if(jsonData.status ==="success"){            
      //       componentReference.setState({ instanceName:jsonData.value.instancename })
      //   }
      //   else{
      //     //show proper message
      //   }
      // }).catch(function(err) {
      //     componentReference.setState({busy:false})
      //     //show proper message
      // })

  }

  pushButton(state){

    this.setState({busy:true});
    pushButton(this.props.access_token,this.props.item).then(
      (res) => {        
        this.setState({busy:false
        });
      }
    );

    // var socketid = this.props.socket? this.props.socket.id : "";

    // var componentReference = this;  

    // componentReference.setState({busy:true})

    // var google_token = componentReference.props.google_token;
    // var userId = componentReference.props.userId;
    // var instanceId = componentReference.props.item.instanceid;

    // var url = "/buttons/button";
    // var params =  "access_token=" + google_token 
    //              +"&userId=" + userId 
    //              +"&instanceId=" + instanceId
    //              + "&socketid=" + socketid;                 


    // var http = new XMLHttpRequest();

    // http.open("POST", url, true);

    // http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  

    // http.onreadystatechange = function() {

    //     componentReference.setState({busy:false})

    //     if(http.readyState === 4 && http.status === 200) {

    //         var response = JSON.parse(http.response);

    //         componentReference.setState({switchState:response.value });
    //         //console.log(response.value);            
    //     }
    //     else{            
    //     }
    // }

    // http.send(params);
  }

  //Interface for all services
  applyPushData(data){
    if(data.data.method === "push"){
      this.getButton();
    }
  }

  //Interface for all services
  updateInstance(){
    this.getButton();
  }

}

export default PButton;