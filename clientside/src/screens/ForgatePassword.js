import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ForgatePassword() {
  const [open, setOpen] = React.useState(false);
  const [email,setEmail] = React.useState('')
//   const Dispatch = React.useDispatch()
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (e) => {
      
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined"  className='botton  primary' onClick={handleClickOpen}>
      <h5> Forgate Password </h5>
      </Button>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"><h5>Send Password</h5></DialogTitle>
        <DialogContent>
          <DialogContentText><h5>
            To forget your password, please enter your email address here. We will send updates
            occasionally.</h5>
          </DialogContentText>
          <h5>
          <TextField

            autoFocus
            value={email}
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            onChange={(e)=>setEmail(e.target.value)}
            fullWidth
          /></h5>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
           <h5> Cancel</h5>
          </Button>
          <Button onClick={handleClose} color="primary">
          <h5>Send Password-recover-email</h5>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
