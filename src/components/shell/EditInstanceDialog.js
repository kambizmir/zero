import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {
  state = {
    nameText : ""
  };

  componentDidUpdate(prevProps, prevState, snapshot){
    if(this.props.open  && !prevProps.open){
      this.setState({nameText : this.props.item?this.props.item.instancename:"" });
    }
  }


  handleClose = () => {
    this.props.close();
  };

  handleSave = () => {    
    this.props.save(this.props.item,this.state.nameText);    
  };

  onNameChange = (e) => {
    this.setState({nameText:e.target.value});
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
                      Edit Instance
                      {" "  +  (this.props.item?this.props.item.instanceid:"")  + " "}
          </DialogTitle>
          <DialogContent>

            <TextField              
              margin="dense"
              id="name"
              label="Name"              
              fullWidth
              onChange = {this.onNameChange}
              value = {this.state.nameText}
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


