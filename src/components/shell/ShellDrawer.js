import React, { Component } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

class ShellDrawer extends Component {


  dismissDrawer = () => () => {
    this.props.dismissDrawer();
  };


  render() {
    const sideList = (
      //<div className={classes.list}>
      <div>
        {/*<List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        
        <Divider />
      
      */}

        <List>
          {this.props.servicesList.map((item, index) => (
            <ListItem button key={item.id}>              
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>




      </div>
    );




    return (
      <SwipeableDrawer    
         open={this.props.visible}
        onClose={this.dismissDrawer()}
        onOpen={this.dismissDrawer()}
      >
        <div
          tabIndex={0}
          role="button"
          onClick={this.dismissDrawer()}
          onKeyDown={this.dismissDrawer()}
        >
          {sideList}
        </div>
      </SwipeableDrawer>
    );
  }
}

export default ShellDrawer;