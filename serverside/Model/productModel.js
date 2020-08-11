import mongoose, { Schema } from 'mongoose';
import mongoosepaginate from 'mongoose-paginate'
const productSchema = new Schema({
    _id:{
        type:String
    },
    category:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
        
    },
    brand:{
        type:String,
        required:true
    },
    pack_size:{
        type:Number,
        default:0
    },
    Mrp:{
        type:Number

    },
    price:{
        type:Number,
        required:true
    },
    offers:{
        type:Number
    },
    Combo_Offers:{

    },
    Stock_Availibility:{
        type:String,

    },
    image:{
        type:String
    },
    numReviews:{
        type:Number,
        default:0
    },
    countInStack:{
        type:Number,
        default: 10
    }

})
productSchema.plugin(mongoosepaginate)
const productmodel = mongoose.model("productdata",productSchema,"productdata")
module.exports=productmodel;
