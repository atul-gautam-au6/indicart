import { sign } from 'jsonwebtoken';
import { JWT_SECRET_KEY } from "./config";
const getToken = (user) =>{
    return sign({
        _id:user._id,
        naame:user.name,
       email:user.email,
      password:user.password,
       isAdmin:user.isAdmin,
    },'JWT@Secreate$',{ expiresIn:'48h' })
}
export {
    getToken
}