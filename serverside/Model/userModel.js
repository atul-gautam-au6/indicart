import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        dropDups:true
    },
    googleId:{
        type:String
    },
    password:{
        type:String
       
    },
    isAdmin:{
        type:String,
        required:true,
        default:false

    }
    
})
const userModel = mongoose.model("User",userSchema);
export default userModel;