import mongoose from "mongoose";
const productschema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
price:{
    type:Number,
    required:true
},
image:{
    type:String,
    required:true
},

},{
    timestamps:true
});
const Product=mongoose.model('Product',productschema);
export default Product;