import React ,{ useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from "@material-ui/icons/Edit";
import { useEffect } from 'react';

export default function Edit( props ) {

  const [open, setOpen] = useState(false);
  const [editFile, setEditFile] = useState([{
      id:"",
      type:"",
      name:""
  }]);
// const [editFile, setEditFile] = useState([])
// const [editFileName, setEditFileName] = useState("")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getValues=(file)=>{
      console.log(file);
    setEditFile({...file})
    setOpen(true)
  }

  const onChangeEditFile=(e)=>{
    //   setEditFile({id:props.file.id ,type:props.file.type,name:e.target.value})
      setEditFile({...editFile,name:e.target.value})
    
  }
  
  const updateFile = () => {
    props.updatedFile(editFile)
    handleClose()
  }

  return (
    <div>
      <EditIcon onClick={()=>getValues(props.file)} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Edit</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {/* File Name :  <input type="text" value={} onChange={(e)=>onChangeEditFile(e)} /> */}
          File Name :  <input type="text" value={editFile.name} onChange={(e)=>onChangeEditFile(e)} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={updateFile} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
