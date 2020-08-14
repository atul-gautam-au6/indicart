import User from '../Model/userModel'
import { getToken } from '../utils'
import {OAuth2Client} from 'google-auth-library'
// import googleController from './googleController'
const client =new OAuth2Client('"485426421084-eoa7b38nq83it0t5742j08sejfbg9ivh.apps.googleusercontent.com"')

module.exports ={
    async RegisterByGoogle(googleToken){
        try {

                    
            const{ payload }= await client.verifyIdToken({idToken:googleToken.tokenId,audience:"485426421084-eoa7b38nq83it0t5742j08sejfbg9ivh.apps.googleusercontent.com"})   
            const userExist = await User.findOne({email:payload.email})
           if(userExist){
               console.log('usr already registerd')
               return res.send('User Already Exist')
           }
           const user = new User({
               name:payload.name,
               email:payload.email,
               password:'1234',
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
            
            
        } catch (error) {
            console.log(error.message)
            return  res.status(404).send({message:error.message}) 
        }
    }
}