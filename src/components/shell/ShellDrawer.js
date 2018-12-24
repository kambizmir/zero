import React, { Component, Fragment } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

import Button from '@material-ui/core/Button';

import { styled } from '@material-ui/styles';


const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
});


const NestedListItem = styled(ListItem)({
  paddingLeft: 30,
});

class ShellDrawer extends Component {

  handleExpandClick = (item) => {
    //console.log(item)
    this.props.drawerExpandChanged(item);    
  };

  handleSwitchClick = (item) =>{
    //console.log("switch clicked", item)
    this.props.switchClicked(item);
  }

  dismissDrawer = () => () => {
    this.props.dismissDrawer();
  };

  serviceClicked = (item) =>{
    //console.log(item)
    this.props.serviceClicked(item);
  }

  instanceClicked = (item) => {
    this.props.instanceClicked(item);
  }

  render() {
    const sideList = (
    
      <div>
    
        <List >
          {this.props.combinedLists.map((item, index) => (
            <Fragment key={item.id +"f"}>

              <ListItem button key={item.id}>              
                <ListItemText primary={item.name} onClick={this.serviceClicked.bind(this,item)}/>
                  {
                    this.props.drawerExpandMap[item.id] ? 
                    <ExpandLess  onClick={this.handleExpandClick.bind(this,item)} color="secondary"/> : 
                    <ExpandMore onClick={this.handleExpandClick.bind(this,item)} color="secondary"/>
                  }
                </ListItem>
            
                <Collapse in={this.props.drawerExpandMap[item.id]} timeout="auto" unmountOnExit>

                  <List key={item.id +"x"} dense={true}>
                      {item.instances.map((item2, index2) => (
                        <NestedListItem button key={item2.instanceid}>              
                          <ListItemText primary={item2.instancename}  onClick={this.instanceClicked.bind(this,item2)}/>

                          <ListItemSecondaryAction>
                            <Switch  key={item.id +"s"} 
                                    onClick={this.handleSwitchClick.bind(this,item2)}
                                    checked = {this.props.drawerSwitchMap[item2.instanceid]}/>
                          </ListItemSecondaryAction>

                        </NestedListItem>
                      ))}
                  </List>

                </Collapse>
              
          </Fragment>

          ))}
        </List>

      </div>
    );




    return (
      <SwipeableDrawer    
        open={this.props.visible}
        onClose={this.dismissDrawer()}
        //onOpen={this.dismissDrawer()}
      >
        <div
          tabIndex={0}
          role="button"
         // onClick={this.dismissDrawer()}
         // onKeyDown={this.dismissDrawer()}
        >
          {sideList}
        </div>
      </SwipeableDrawer>
    );
  }
}

export default ShellDrawer;