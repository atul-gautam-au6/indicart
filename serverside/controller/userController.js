import User from '../Model/userModel'
import { getToken } from '../utils'
import {OAuth2Client} from 'google-auth-library'

const client =new OAuth2Client('"485426421084-eoa7b38nq83it0t5742j08sejfbg9ivh.apps.googleusercontent.com"')
module.exports ={
     async registerroute(req,res){
        try {
            const googleToken = req.body
            if(!googleToken.tokenId){

                const{ payload }= await client.verifyIdToken({idToken:googleToken.tokenId,audience:"485426421084-eoa7b38nq83it0t5742j08sejfbg9ivh.apps.googleusercontent.com"})        
            }
            const userExist = await User.findOne({email:payload.email||googleToken.email})
            console.log(googleToken.name)
           if(userExist){
               return res.send('User Already Exist')
           }
           const user = new User({
               name:payload.name||googleToken.name,
               email:payload.email||googleToken.email,
               password:'1234'||googleToken.password,
               email_verified:payload.email_verified||googleToken.email_verified
           })
           const newuser = user.save()
           if(newuser){
               return res.send({newUser})
           }
           else{
               return res.send('user not created')
           }
            
            
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