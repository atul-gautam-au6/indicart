import express from 'express'
import User from '../Model/userModel'
import { registerroute, signinroute, adminroute,EmailVerification } from '../controller/userController'
import { isAuth, getToken } from '../utils';
import {hash} from 'bcryptjs'
const router = express.Router()

router.post('/register',registerroute)
router.post('/confirmation/:token',EmailVerification)
router.post('/signin',signinroute)

router.put('/:id',isAuth,async(req,res)=>{
    const userId = req.params.id;
  const user = await User.findById(userId);
  console.log(user)
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password =await hash( req.body.password || user.password,10)
    const updatedUser = await user.save();
    return res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser)
  
    });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
});

router.post('/address',isAuth,async(req,res)=>{
 
 const {ok}=await User.updateMany({_id:req.user._id},{$set:{'Address.0.address':req.body.address,'Address.0.city':req.body.city,'Address.0.postalCode':req.body.postalCode,'Address.0.country':req.body.country}})
//  const updateUser =await user.save()
//  console.log(user)
if(ok=='1'){
  const {Address}  =await User.findById(req.user._id)
  console.log(Address)
  return res.send(Address)
}
})


export default router;