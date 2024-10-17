import { model, Schema } from "mongoose";
// schema
const reviewSchema = Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    product:{
        type:Schema.Types.ObjectId,
        ref:'product',
        required:true
    },
    Comment:String,
    rate:{
        type:Number,
        min:0,
        max:5
    },
    isVerified:Boolean
},{timestamps:true})
//model
export  const Review = model('Review', reviewSchema)