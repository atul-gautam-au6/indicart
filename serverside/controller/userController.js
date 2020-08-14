import User from '../Model/userModel'
import { getToken } from '../utils'
import {OAuth2Client} from 'google-auth-library'
import {hash,compare} from 'bcryptjs'
import { restart } from 'nodemon'

const client =new OAuth2Client('"485426421084-eoa7b38nq83it0t5742j08sejfbg9ivh.apps.googleusercontent.com"')
module.exports ={
     async registerroute(req,res){
        const userRegisterData = req.body 
        if(!userRegisterData){
            return res.send({msg:'please enter all feild'})
        }
        if(userRegisterData.tokenId){
            const{ payload }= await client.verifyIdToken({idToken:userRegisterData.tokenId,audience:"485426421084-eoa7b38nq83it0t5742j08sejfbg9ivh.apps.googleusercontent.com"})   
            const userExist = await User.findOne({email:payload.email})
            if(userExist){
                console.log('usr already registerd')
                return res.send('User Already Exist')
            }
            const HashedPassword = await hash('123',10)
            const user = new User({
                name:payload.name,
                email:payload.email,
                password:HashedPassword,
                email_verified:payload.email_verified
            })
            const newuser = user.save()
            if(newuser){
                console.log('user register success')
                return res.send({newuser})
            }
            else{
                console.log('some error')
                return res.send('user not created')
            }
             
        }
         
        try {
            const UserExistHere = await User.findOne({email:userRegisterData.email})
            if(UserExistHere){
                console.log('user Already Registeres Here')
                return res.send('User Already Registered here')
            }
            const HashedPassword = await hash(req.body.password,10)
            // console.log(HashedPassword)
           const userSave = new User({
              name:req.body.name,
              email:req.body.email,
              password:HashedPassword
           })
           const NewUser =await userSave.save()
           if(!NewUser){
               console.log('something missing or wrong using create user')
               res.send('something missing or wrong using create user')

           }
           else{
               console.log('userCreated Success')
               return res.send(NewUser)
           }
            
        } catch (error) {
            console.log(error.message)
            return res.send('catch eroor:',error.message)
        }
        
    },
//########################################+++sign-in+++#############################################################################
    async signinroute (req,res){
        if(!req.body){
            console.log('invalid credetials')
            return res.send('invalid credentials')
        }       
        try {
            const {_id,name,email,password,email_verified,isAdmin} = await User.findOne({email:req.body.email})           
            const isMatch = await compare(req.body.password,password)
            if(!email&&!isMatch){
                return res.send('Invalid credentials')
            }
            if(email&&isMatch){
                return res.send({
                    id:_id,
                    name:name,
                    email:email,
                    email_verified:email_verified,
                    isAdmin:isAdmin,
                    token:getToken({name,email,password,_id,isAdmin})
                })
                
            }
           
        //    return res.send({
        //             id:signinUser.id,
        //             name:signinUser.name,
        //             email:signinUser.email,
        //             isAdmin:signinUser.isAdmin,
        //             token:getToken(signinUser)
        //    })

            // if(signinUser){
            //    return res.send({
            //         id:signinUser.id,
            //         name:signinUser.name,
            //         email:signinUser.email,
            //         isAdmin:signinUser.isAdmin,
            //         token:getToken(signinUser)
            //     })
            // }
            // else{
            //   return  res.status(404).send({message:'user not fount'})
            // }
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