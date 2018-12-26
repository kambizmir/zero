import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {
  state = {
    idText : "",
    nameText : ""

  };



  handleClose = () => {
    this.props.close();
  };

  handleCreate = () => {      
    const cleanService = Object.assign({}, this.props.item, { instances: undefined });
    this.props.create(cleanService, this.state.idText,this.state.nameText);
  }

  onIdChange = (e) => {    
    this.setState({idText:e.target.value});
  }

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
          <DialogTitle id="form-dialog-title">Create
                      {" "  +  (this.props.item?this.props.item.name:"")  + " "}
                       Instance
          </DialogTitle>
          <DialogContent>
 
            <TextField
              autoFocus
              margin="dense"
              id="id"
              label="Id"              
              fullWidth
              onChange = {this.onIdChange}
            />

            <TextField              
              margin="dense"
              id="name"
              label="Name"              
              fullWidth
              onChange = {this.onNameChange}
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCreate} color="primary">
              Create
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


