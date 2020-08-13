import { sign,verify } from 'jsonwebtoken';
import { JWT_SECRET_KEY } from './config';
const getToken = (user) =>{
    return sign({
        _id:user._id,
        naame:user.name,
       email:user.email,
      password:user.password,
       isAdmin:user.isAdmin,
    },JWT_SECRET_KEY,{ expiresIn:'48h' })
}

const isAuth = (req,res,next) =>{
    const token  = req.headers.authorization;
    if(token){
        const onlyToken = token.slice(7,token.length)
        verify(onlyToken,JWT_SECRET_KEY,(err,decode)=>{
            if(err){
                return res.status(401).send({msg:'Invalid Token'})
            }
            req.user=token;
            next()
            return
        })
    }
    return res.status(401).send({msg:'Token is not supplied'})
}
const isAdmin = (req,res,next)=>{
    if(req.user&&req.user.isAdmin){
        return next()
    }
    return res.status(401).send({msg:'Admin token is not valid'})
}

export {
    getToken,isAuth,isAdmin
}