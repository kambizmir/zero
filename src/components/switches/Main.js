import React, { Component } from 'react';
import Switch from '@material-ui/core/Switch';
import { CircularProgress } from '@material-ui/core/CircularProgress';

import {getInstance , updateInstance} from './api' ;


class TSwitch extends Component{

  constructor(props){
    super(props); 
    this.state = {switchState:false , instanceName:"", busy:false};
  }

	changeHandler = (e,checked) => {
    this.setSwitchState(checked);
	}

  componentDidMount() {
    this.setState( {switchState : this.getSwitch() });
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
            
               checked={this.state.switchState }
            
            />            
            {/* To avoid state of null*/}

            <br/>                          
          </div>

        </div>

      </div>
                
    ) 

  }

 getSwitch = () => {    
      //var socketid = this.props.socket? this.props.socket.id : "";
      this.setState({busy:true});
      getInstance(this.props.access_token,this.props.item.instanceid).then(
        (res) => {        
          this.setState({switchState:res.response.data.Item.switchstate,
                         busy:false
          });
        }
      );
  }

  setSwitchState = (state) => {

    this.setState({busy:true});
    updateInstance(this.props.access_token,this.props.item,state).then(
      (res) => {        
        this.setState({switchState:res.response.switchstate,
                       busy:false
        });
      }
    );
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