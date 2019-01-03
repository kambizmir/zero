import React, { Component } from 'react';
import ShellAppbar from './ShellAppbar.js';
import ShellDrawer from './ShellDrawer.js';
import NewInstanceDialog from './NewInstanceDialog.js';
import EditInstanceDialog from './EditInstanceDialog.js';

import { connect } from 'react-redux';
import {topLeftMenuIconClick, leftMenuDismmiss ,updateServices, 
        updateUserInfo, updateInstances, updateDrawerExpand,
        changeDrawerSwitchState} from "../../redux/shell/action.js";

import {getServices , getInstances , createInstance, updateInstance} from "./api.js"


class Shell extends Component {


  //HOW TO REFRESH TOKEN?

  
  state = {
    createInstanceDialogOpen:false,
    itemBeingCreated:null,
    editInstanceDialogOpen:false,
    itemBeingEdited:null,

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


  instancesUpdateCallback = (response) =>{
    //console.log("UPDATE RESPONS",response)
    if(response.status===0){
      getServices(this.props.access_token).then(this.servicesReceivedCallback);
      getInstances(this.props.access_token).then(this.instancesReceivedCallback);
      this.setState({editInstanceDialogOpen:false,itemBeingEdited:null});
    }
    else{
      alert(response.message);
    }

    
  }

  instancesCreateCallback = (response) =>{
    //console.log("INSTANCE CREATE RESPONSE:", response)
    if(response.status===0){
      getServices(this.props.access_token).then(this.servicesReceivedCallback);
      getInstances(this.props.access_token).then(this.instancesReceivedCallback);
      this.setState({createInstanceDialogOpen:false,itemBeingCreated:null});
    }
    else{
      alert(response.message);
    }
  }

  serviceClicked = (item)=>{  
    this.setState({createInstanceDialogOpen:true,
                   itemBeingCreated:item});
  }

  instanceClicked = (item)=>{
    this.setState({editInstanceDialogOpen:true,
      itemBeingEdited:item});
  }

  closeCreateInstance = () => {
    this.setState({createInstanceDialogOpen:false});
  }

  closeEditInstance = () => {
    this.setState({editInstanceDialogOpen:false});
  }
  
  createInstanceRequest = (service,id,name) =>{
    //console.log("Requst to create instance " , service, id, name)
    createInstance(this.props.access_token,service,id,name).then(this.instancesCreateCallback);
  }

  updateInstanceRequest = (instance,name) =>{
    console.log("Request to update instance", instance,name)
    updateInstance(this.props.access_token,instance,name).then(this.instancesUpdateCallback);
  }

  render() {

    //console.log(this.state)

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
                         serviceClicked = {this.serviceClicked}
                         instanceClicked = {this.instanceClicked}/>

          <NewInstanceDialog open={this.state.createInstanceDialogOpen}                             
                             item = {this.state.itemBeingCreated}
                             close = {this.closeCreateInstance}
                             create = {this.createInstanceRequest}/>   

          <EditInstanceDialog open={this.state.editInstanceDialogOpen}                             
                             item = {this.state.itemBeingEdited}
                             close = {this.closeEditInstance}
                             save = {this.updateInstanceRequest}/>                                

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