import React ,{ useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from "@material-ui/icons/Delete";
import { useEffect } from 'react';

export default function Edit( props ) {

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const getValues = () =>{
    setOpen(true)
  }

  const deleteFile = () => {
      props.deleteFile(props.file)
  }

  return (
    <div>
      <DeleteIcon onClick={()=>getValues()} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">Delete</DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Would you like to delete this file {props.file.name} ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteFile} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
