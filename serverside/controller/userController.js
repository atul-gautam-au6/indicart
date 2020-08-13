import User from '../Model/userModel'
import { getToken } from '../utils'
import { response } from 'express'

module.exports ={
     async registerroute(req,res){
        try {
            const userData = req.body
            const userIsPresend =await User.findOne({email:req.body.email})
            console.log(userIsPresend)
            if(!userIsPresend){
                const user = new User({
                    
                    ...userData
                })
                const newuser = await user.save()
                // console.log(newuser)
                if(newuser) {
                    return res.send({
                        id:newuser.id,
                        name:newuser.name,
                        email:newuser.email,
                        isAdmin:newuser.isAdmin,
                        token:req.body.token ?req.body.token:getToken(newuser)
                    })
                }
                else{
                    return res.status(201).send({msg:'email and password not valid'})
                }
            }
            return res.send('User Already Registered here')

            
        } catch (error) {
            return  res.status(404).send({message:error.message})
        }
    },

    async signinroute (req,res){
        try {
            const signinUser =await User.findOne(
                {
                    email:req.body.email,
                    password:req.body.password
                }
            )
            if(signinUser){
               return res.send({
                    id:signinUser.id,
                    name:signinUser.name,
                    email:signinUser.email,
                    isAdmin:signinUser.isAdmin,
                    token:getToken(signinUser)
                })
            }
            else{
              return  res.status(404).send({message:'user not fount'})
            }
        } catch (error) {
          return  res.status(404).send({message:error.message})
        }
    },

    async adminroute (req,res){
        try {
            const user = new User({
                name:"atul",
                email:'atulspl2019@gmail.com',
                password:'1234',
                isAdmin:true
            })
            const newUser = await user.save();
            return res.send(newUser)
            
        } catch (error) {
           return  res.send({msg:error.message})
        }
       
    }
}