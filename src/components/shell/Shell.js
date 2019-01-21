import React, { Component } from 'react';
import { toast ,Flip} from 'react-toastify';
import { connect } from 'react-redux';

import ShellAppbar from './ShellAppbar.js';
import ShellDrawer from './ShellDrawer.js';
import NewInstanceDialog from './NewInstanceDialog.js';
import EditInstanceDialog from './EditInstanceDialog.js';
import ConfirmDialog from './ConfirmDialog.js';
import ShellCanvas from './ShellCanvas.js'

import {topLeftMenuIconClick, leftMenuDismmiss ,updateServices, 
        updateUserInfo, updateInstances, updateDrawerExpand,
        changeDrawerSwitchState} from "../../redux/shell/action.js";

import {getServices , getInstances , createInstance, updateInstance, deleteInstance} from "./api.js"


class Shell extends Component {

  //TODO: HOW TO REFRESH TOKEN?

  state = {
    access_token:null,
    userInfo:null,

    createInstanceDialogOpen:false,
    itemBeingCreated:null,
    editInstanceDialogOpen:false,
    itemBeingEdited:null,

    confirmDialogTitle:null,
    confirmDialogContentText:null,
    confirmDialogPositiveText:null,
    confirmDialogNegativeText:null,
    confirmDialogOpen:false,
    confirmDialogItem:null
  };

  componentDidMount() {
    this.props.updateStateWithUserInfo(this.props.userInfo , this.props.access_token, this.props.id_token); 
    
    this.setState({
        access_token:this.props.access_token,
        userInfo:this.props.userInfo
    });         

    getServices(this.props.access_token).then(this.servicesReceivedCallback)
    getInstances(this.props.access_token).then(this.instancesReceivedCallback);
  }

  servicesReceivedCallback = (response)=>{
    if(response.status === -1){      
      toast(response.message, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip
      });
      return;
    }    
    this.props.updateStateWithServices(response.response.Items);         
  }

  instancesReceivedCallback = (response)=>{
    if(response.status === -1){      
      toast(response.message, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip
      });
      return;
    }

    //console.log(response)
    for(let i=0;i<response.response.Items.length;i++){
      response.response.Items[i]["visible"] = false;
    }
    this.props.updateStateWithInstances(response.response.Items);  
  }

  instancesCreateCallback = (response) =>{
    //console.log("INSTANCE CREATE RESPONSE:", response)
    if(response.status===0){
      getServices(this.props.access_token).then(this.servicesReceivedCallback);
      getInstances(this.props.access_token).then(this.instancesReceivedCallback);
      this.setState({createInstanceDialogOpen:false,itemBeingCreated:null});
    }
    else{
      //alert(response.message);
      toast(response.message, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip
      });
    }
  }

  instancesUpdateCallback = (response) =>{
    //console.log("UPDATE RESPONS",response)
    if(response.status===0){
      getServices(this.props.access_token).then(this.servicesReceivedCallback);
      getInstances(this.props.access_token).then(this.instancesReceivedCallback);
      this.setState({editInstanceDialogOpen:false,itemBeingEdited:null});
    }
    else{
      //alert(response.message);
      //toast(response.message);
      toast(response.message, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip
      });
    }
  }

  instancesDeleteCallback = (response) =>{
    
    if(response.status===0){
      getServices(this.props.access_token).then(this.servicesReceivedCallback);
      getInstances(this.props.access_token).then(this.instancesReceivedCallback);
      this.setState({editInstanceDialogOpen:false,itemBeingEdited:null});
    }
    else{
      //alert(response.message);
      //toast(response.message);
      toast(response.message, {
        position: toast.POSITION.TOP_CENTER,
        transition: Flip
      });
    }
  }

  serviceClicked = (item)=>{  
    this.setState({createInstanceDialogOpen:true,
                   itemBeingCreated:item});
  }

  instanceClicked = (item)=>{
    this.setState({editInstanceDialogOpen:true,
      itemBeingEdited:item});






      //this.canvas.addInstance(item);
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
    //console.log("Request to update instance", instance,name)
    updateInstance(this.props.access_token,instance,name).then(this.instancesUpdateCallback);
  }

  showDeleteConfirmDialog = (instance) =>{
    this.setState(
      {confirmDialogTitle:"Do you want to delete this instance?",
       confirmDialogContentText:"",
       confirmDialogPositiveText:"Yes",
       confirmDialogNegativeText:"No",
       confirmDialogOpen:true,
       confirmDialogItem:instance,
      }
    );
  }

  deleteInstanceRequest = (instance) =>{
    deleteInstance(this.props.access_token,instance).then(this.instancesDeleteCallback);
  }

  closeConfirmDialog = ()=>{
    this.setState({confirmDialogOpen:false});
  }

  confirmDialogPositiveClick = (instance)=>{
    //console.log("ITEM TO DELETE",instance)
    this.setState({confirmDialogOpen:false});
    this.deleteInstanceRequest(instance);
  }

  confirmDialogNegativeClick = ()=>{
    this.setState({confirmDialogOpen:false});
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
                             save = {this.updateInstanceRequest}
                             delete = {this.showDeleteConfirmDialog}
          />      

          <ConfirmDialog open = {this.state.confirmDialogOpen}
                         title = {this.state.confirmDialogTitle}
                         contentText = {this.state.confirmDialogContentText}
                         positiveText = {this.state.confirmDialogPositiveText}
                         negativeText = {this.state.confirmDialogNegativeText}
                         close = {this.closeConfirmDialog}
                         positiveClick = {this.confirmDialogPositiveClick}
                         negativeClick = {this.confirmDialogNegativeClick}
                         item = {this.state.confirmDialogItem}
          />                   


          <ShellCanvas 
                        ref={x => { this.canvas = x; }}                        
                        instanceToShow = {this.props.instanceToShowProp}
                        instanceToHide = {this.props.instanceToHideProp}
                        userInfo = {this.props.userInfo }
                        access_token = {this.props.access_token}
                        //socket = {this.props.socket}
          />


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
          drawerSwitchMapProp:state.shell.instancesVisbleMap,

          instanceToShowProp:state.shell.instanceToShow,
          instanceToHideProp:state.shell.instanceToHide,

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