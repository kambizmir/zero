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


class ShellDrawer extends Component {

  state = {
    open: true,
  };

  handleExpandClick = (item) => {
    console.log(item)
    this.props.drawerExpandChanged(item);
    //this.setState(state => ({ open: !state.open }));
  };


  dismissDrawer = () => () => {
    this.props.dismissDrawer();
  };



  render() {
    const sideList = (
    
      <div>
    
        <List dense={true}>
          {this.props.combinedLists.map((item, index) => (
            <Fragment key={item.id +"f"}>

              <ListItem button key={item.id}>              
                <ListItemText primary={item.name} />

                {this.props.drawerExpandMap[item.id] ? <ExpandLess  onClick={this.handleExpandClick.bind(this,item)}/> : <ExpandMore onClick={this.handleExpandClick.bind(this,item)} />}

              </ListItem>
            
                
              <Collapse in={this.props.drawerExpandMap[item.id]} timeout="auto" unmountOnExit>

                <List key={item.id +"x"}>
                    {item.instances.map((item2, index2) => (
                      <ListItem button key={item2.instanceid}>              
                        <ListItemText primary={item2.instancename} />

                        <ListItemSecondaryAction>
                          <Switch  />
                        </ListItemSecondaryAction>


                      </ListItem>
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