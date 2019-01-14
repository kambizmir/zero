import React, { Component } from 'react';
//import { CircularProgress } from 'material-ui/Progress';

class PButton extends Component{


  constructor(props){
    super(props);
    this.changeHandler = this.changeHandler.bind(this); 
    this.mouseHandler = this.mouseHandler.bind(this);  
    this.state = {value:0 , instanceName:"", busy:false};
  }

  changeHandler(e){
    //this.setSwitchState(value);
    //console.log(e.target.value)
    this.setState({value:e.target.value})
  }

  mouseHandler(e){
    console.log(e.target.value)

    this.setRangeValue(e.target.value)
  }

  componentDidMount() {
    this.state.value = this.getRange();
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

              <div >                            
                {/* {this.state.instanceName}                    */}
                {this.props.item.instancename}
                <br/>
                <input type="range"  min={0} max={10} value={this.state.value>=0? this.state.value: 0} onChange = {this.changeHandler} 
                      onMouseUp = {this.mouseHandler} onTouchEnd = {this.mouseHandler}></input>
                <br/>
              </div>
              
            </div>
          
          
          </div>
            
          
        
      ) 
   
  }

  getRange(){

      var socketid = this.props.socket? this.props.socket.id : "";

      var componentReference = this;  

      componentReference.setState({busy:true})
      
      var google_token = componentReference.props.google_token;
      var userId = componentReference.props.userId;
      var instanceId = componentReference.props.item.instanceid;    
      var url = "/ranges/range?access_token=" + google_token + "&userId=" + userId + "&instanceId=" +instanceId + "&socketid=" + socketid;  

      fetch(url,{ credentials: 'include' }).then(function(response){
        return response.json()
      }).then(function(jsonData){

          //console.log(jsonData)
          componentReference.setState({busy:false})
          if(jsonData.status ==="success"){            
            componentReference.setState({value:jsonData.value.rangevalue , instanceName:jsonData.value.instancename })
        }
        else{
          //show proper message
        }
      }).catch(function(err) {
          componentReference.setState({busy:false})
          //show proper message
      })

  }

  setRangeValue(value){

    var socketid = this.props.socket? this.props.socket.id : "";

    var componentReference = this;  

    componentReference.setState({busy:true})

    var google_token = componentReference.props.google_token;
    var userId = componentReference.props.userId;
    var instanceId = componentReference.props.item.instanceid;

    var url = "/ranges/value";
    var params =  "access_token=" + google_token 
                 +"&userId=" + userId 
                 +"&instanceId=" + instanceId 
                 +"&value=" + value
                 +"&socketid=" + socketid; 


    var http = new XMLHttpRequest();

    http.open("POST", url, true);

    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");  

    http.onreadystatechange = function() {

        componentReference.setState({busy:false})

        if(http.readyState === 4 && http.status === 200) {

            var response = JSON.parse(http.response);

            componentReference.setState({value:response.value });
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
      this.getRange();
    }
  }

  //Interface for all services
  updateInstance(){
    this.getRange();
  }




}

export default PButton;