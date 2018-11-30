import React, { Component } from 'react';
import ShellAppbar from './ShellAppbar.js';
import ShellDrawer from './ShellDrawer.js';

import { connect } from 'react-redux';
import {topLeftMenuIconClick, leftMenuDismmiss, alakiAction,updateServices, updateUserInfo} from "../../redux/shell/action.js";

import {getServices} from "./api.js"


class Shell extends Component {

  componentDidMount() {
    getServices().then(this.servicesReceivedCallback);
    this.props.updateStateWithUserInfo(this.props.userInfo);
  }

  servicesReceivedCallback = (response)=>{
    console.log(response)
    this.props.updateStateWithServices(response.Items);
    this.props.alaki();
  }

  alaki = ()=>{
    console.log("alaki")
  }


  render() {

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
          servicesListProp:state.shell.servicesList}

};

const mapDispatchToProps = dispatch => {    
  return{
    handleTopLeftMenuClick: () => {       
      dispatch(topLeftMenuIconClick());
    },
    dismissDrawer: () =>{
      dispatch(leftMenuDismmiss());
    },
    alaki: ()=>{
      dispatch(alakiAction());
    },
    updateStateWithServices: (servicesList)=>{
      dispatch(updateServices(servicesList));
    },
    updateStateWithUserInfo: (userInfo)=>{
      dispatch(updateUserInfo(userInfo))

      
    }
  };
};

const ShellContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Shell);

export default ShellContainer;