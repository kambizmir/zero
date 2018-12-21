import React, { Component } from 'react';
import ShellAppbar from './ShellAppbar.js';
import ShellDrawer from './ShellDrawer.js';
import NewInstanceDialog from './NewInstanceDialog.js';

import { connect } from 'react-redux';
import {topLeftMenuIconClick, leftMenuDismmiss ,updateServices, 
        updateUserInfo, updateInstances, updateDrawerExpand,
        changeDrawerSwitchState} from "../../redux/shell/action.js";

import {getServices , getInstances} from "./api.js"


class Shell extends Component {


  //HOW TO REFRESH TOKEN?

  
  state = {
    createInstanceDialogOpen:false,

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

 

  servicesReceivedCallback = (response)=>{
    if(response.status === -1){
      alert(response.message);
      return;
    }
    
    this.props.updateStateWithServices(response.response.Items);    
     
  }

  instancesReceivedCallback = (response)=>{
    if(response.status === -1){
      alert(response.message);
      return;
    }

    //console.log(response)
    for(let i=0;i<response.response.Items.length;i++){
      response.response.Items[i]["visible"] = false;
    }
    this.props.updateStateWithInstances(response.response.Items);  
  }

  serviceClicked = (item)=>{
    //alert(item.name + " clicked")

    this.setState({createInstanceDialogOpen:true});
  }

  closeCreateInstance = () => {
    this.setState({createInstanceDialogOpen:false});
  }

 

  render() {

    console.log(this.state)

    return (
          <div>
            <ShellAppbar handleTopLeftMenuClick = {this.props.handleTopLeftMenuClick}/>
            <ShellDrawer dismissDrawer = {this.props.dismissDrawer} 
                         visible = {this.props.lefMenuVisibleProp}
                         combinedLists = {this.props.combinedListsProp}
                         drawerExpandChanged = {this.props.drawerExpandChanged}
                         drawerExpandMap = {this.props.drawerExpandMapProp} 
                         switchClicked = {this.props.instanceSwitchClicked}
                         drawerSwitchMap = {this.props.drawerSwitchMapProp}
                         serviceClicked = {this.serviceClicked}/>

          <NewInstanceDialog open={this.state.createInstanceDialogOpen}
                             close = {this.closeCreateInstance}/>                         
          </div>      
    );
  }

}


const combineLists = (servicesList,instancesList) =>{

  //console.log("COMBINED ", servicesList,instancesList);


  for(let i = 0 ;i < servicesList.length;i++){
    servicesList[i].instances = [];
    for(let j=0;j<instancesList.length;j++){

      if(instancesList[j].serviceid === servicesList[i].id){
        servicesList[i].instances.push(instancesList[j]);
      }

    } 
  }

  
  return servicesList;

}

const mapStateToProps = (state,props) => {  

  console.log("STATE=",state)
  //console.log("INSIDE mapStateToProps ",state,props)

  //CHECK IF STATE HAS CHANGED - HOW?

  return {lefMenuVisibleProp: state.shell.lefMenuVisible,
          //servicesListProp:state.shell.servicesList,
          
          combinedListsProp:combineLists(state.shell.servicesList , state.shell.instancesList),
          drawerExpandMapProp:state.shell.servicesExpandMap,
          drawerSwitchMapProp:state.shell.instancesVisbleMap

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
    },
    drawerExpandChanged: (item) =>{
      dispatch(updateDrawerExpand(item));
    },
    instanceSwitchClicked: (item) =>{            
      dispatch(changeDrawerSwitchState(item));
    }
  };
};

const ShellContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Shell);

export default ShellContainer;