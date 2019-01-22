import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class ConfirmDialog extends React.Component {
  state = {
    open: false,
  };

  handleClose = () => {
    this.props.close();
  };

  render() {      
    return (
      <div>

        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
        >
          <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.props.contentText}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.negativeClick} color="primary">
              {this.props.negativeText}
            </Button>
            <Button onClick={this.props.positiveClick.bind(this,this.props.item)} color="primary">
            {this.props.positiveText}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ConfirmDialog;
