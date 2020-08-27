import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPasswordActio } from '../action/userAction';
import LoadingOverlay from 'react-loading-overlay';


export default function ForgatePassword() {
  const [open, setOpen] = React.useState(false);
  const [email,setEmail] = React.useState('')
  const dispatch = useDispatch();
  const forgetPassword  = useSelector(state=>state.forgetPassword)
  const {success,loading,error} = forgetPassword
  console.log(forgetPassword)
  const handleClickOpen = () => {
    setOpen(true);
  };
  useEffect(() => {
    if(success){
        alert('forgate success')
        setOpen(false);
    }
    
    return () => {
      // cleanup
    }
  }, [success])

  const handleClose = (e) => {
      
    setOpen(false);
  };
  const submitHandler = (e)=>{
    e.preventDefault()
    dispatch(forgetPasswordActio(email))
  }
  return (
    
    <LoadingOverlay
          active={loading}
          spinner
          text='Email Sending...'
        >
    <Button variant="outlined"  className='botton  primary' onClick={handleClickOpen}> <h5> Forgate Password </h5> </Button>
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title"><h5>Forgat Password</h5></DialogTitle>
        <DialogContent>
          <DialogContentText><h5>To forget your password, please enter your email address here. We will send updates occasionally</h5></DialogContentText>
              <form onSubmit={submitHandler}>
              <TextField autoFocus value={email} margin="dense" id="name" label="Email Address" type="email" onChange={(e)=>setEmail(e.target.value)} fullWidth />
                  <DialogActions><Button onClick={handleClose} color="primary"> <h5> Cancel</h5> </Button>
                    <input type='submit'  value='submit' color="primary" className='button primary'/>
                  </DialogActions>
              </form>
        </DialogContent>
    </Dialog>
    </LoadingOverlay>
    
   
  );
}
