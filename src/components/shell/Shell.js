import React, { Component } from 'react';
import ShellAppbar from './ShellAppbar.js';
import ShellDrawer from './ShellDrawer.js';

import { connect } from 'react-redux';
import {topLeftMenuIconClick, leftMenuDismmiss ,updateServices, updateUserInfo, updateInstances} from "../../redux/shell/action.js";

import {getServices , getInstances} from "./api.js"


class Shell extends Component {


  //HOW TO REFRESH TOKEN?

  state = {
    access_token:null,
    userInfo:{},

  }

  componentDidMount() {
    
    this.props.updateStateWithUserInfo(this.props.userInfo , this.props.access_token, this.props.id_token); 

    
    this.setState(
                {access_token:this.props.access_token,
                userInfo:this.props.userInfo}
              );         

    getServices(this.props.access_token).then(this.servicesReceivedCallback);

    getInstances(this.props.access_token).then(this.instancesReceivedCallback);

  }

 /* componentDidUpdate(prevProps) {
    if (this.props.access_token !== prevProps.access_token) {
      this.fetchData(this.props.userID);
    }
    
   console.log("GGGG",prevProps)
  }*/

  servicesReceivedCallback = (response)=>{
    console.log(response)
    this.props.updateStateWithServices(response.Items);    
  }

  instancesReceivedCallback = (response)=>{
    console.log(response)
    this.props.updateStateWithInstances(response.Items);  
  }

  render() {

    console.log(this.state)

    return (
          <div>
            <ShellAppbar handleTopLeftMenuClick = {this.props.handleTopLeftMenuClick}/>
            <ShellDrawer dismissDrawer = {this.props.dismissDrawer} 
                         visible = {this.props.lefMenuVisibleProp}
                         servicesList = {this.props.servicesListProp}/>
          </div>      
    );
  }

}

const mapStateToProps = state => {  
  console.log(state)
  return {lefMenuVisibleProp: state.shell.lefMenuVisible,
          servicesListProp:state.shell.servicesList,
          //accessTokenProp : state.shell.access_token
         }

};

const mapDispatchToProps = dispatch => {    
  return{
    handleTopLeftMenuClick: () => {       
      dispatch(topLeftMenuIconClick());
    },
    dismissDrawer: () =>{
      dispatch(leftMenuDismmiss());
    },
    updateStateWithServices: (servicesList)=>{
      dispatch(updateServices(servicesList));
    },
    updateStateWithInstances: (instancesList)=>{
      dispatch(updateInstances(instancesList));
    },
    updateStateWithUserInfo: (userInfo, access_token, id_token)=>{
      dispatch(updateUserInfo(userInfo,access_token, id_token))
    }
  };
};

const ShellContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Shell);

export default ShellContainer;