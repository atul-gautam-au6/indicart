import express from 'express'
import User from '../Model/userModel'
import { registerroute, signinroute, adminroute } from '../controller/userController'
import { isAuth, getToken } from '../utils';
import {hash} from 'bcryptjs'
const router = express.Router()

router.post('/register',registerroute)

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
      token: getToken(updatedUser),
    });
  } else {
    res.status(404).send({ message: 'User Not Found' });
  }
});



export default router;