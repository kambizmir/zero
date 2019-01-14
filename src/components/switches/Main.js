import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';
import { CircularProgress } from '@material-ui/core/CircularProgress';


class TSwitch extends Component{

  constructor(props){
    super(props);
    this.changeHandler = this.changeHandler.bind(this);  
    this.getSwitch = this.getSwitch.bind(this);  


    this.state = {switchState:false , instanceName:"", busy:false};
  }

	changeHandler(e,checked){
    this.setSwitchState(checked);
	}

  componentDidMount() {
    this.state.switchState = this.getSwitch();
  }

  componentDidUpdate(prevProps, prevState){
    //console.log("update", prevProps , this.props) 
  }

  render(){

    console.log(this.props)

    var topStyle = {
      position:"relative",
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
    
          <div >                            
            {/*this.state.instanceName */}
            {this.props.item.instancename}
            <br/>
            <Switch onChange = {this.changeHandler} 
            checked={this.state.switchState || false}/>            
            {/* To avoid state of null*/}

            <br/>                          
          </div>

        </div>

      </div>
                
    ) 

  }


 getSwitch(){

      var socketid = this.props.socket? this.props.socket.id : "";

      var componentReference = this;  

      componentReference.setState({busy:true})
      
      var google_token = componentReference.props.google_token;
      var userId = componentReference.props.userId;
      var instanceId = componentReference.props.item.instanceid;    
      var url = "/switches/switch?access_token=" + google_token + "&userId=" + userId + "&instanceId=" +instanceId + "&socketid=" + socketid;  

      fetch(url,{ credentials: 'include' }).then(function(response){
        return response.json()
      }).then(function(jsonData){

          //console.log(jsonData)
          componentReference.setState({busy:false})
          if(jsonData.status ==="success"){            
            componentReference.setState({switchState:jsonData.value.switchstate , instanceName:jsonData.value.instancename })
        }
        else{
          //show proper message
        }
      }).catch(function(err) {
          componentReference.setState({busy:false})
          //show proper message
      })

  }


  setSwitchState(state){

    var socketid = this.props.socket? this.props.socket.id : "";

    var componentReference = this;  
    componentReference.setState({busy:true})

    var google_token = componentReference.props.google_token;
    var userId = componentReference.props.userId;
    var instanceId = componentReference.props.item.instanceid;

    var url = "/switches/state";
    var params =  "access_token=" + google_token 
                 +"&userId=" + userId 
                 +"&instanceId=" + instanceId 
                 +"&state=" + state
                 +"&socketid=" + socketid; 

    var http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  
    http.onreadystatechange = function() {

        componentReference.setState({busy:false})
        if(http.readyState === 4 && http.status === 200) {
            var response = JSON.parse(http.response);
            componentReference.setState({switchState:response.value });
            //console.log(response.value);            
        }
        else{            
        }
    }

    http.send(params);
  }

  //Interface for all services
  applyPushData(data){

    if(data.data.method === "update"){
      this.getSwitch();
    }
  }

  //Interface for all services
  updateInstance(){
    this.getSwitch();
  }





}

export default TSwitch;