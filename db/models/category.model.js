import { model, Schema } from "mongoose";

// schema
const categorySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trin:true 
    },
    image:{
         type:Object,
         required:true // {path} >>> cloud //{secure_url:publid_id}
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required: true
    }
},{timeseries:true, toJSON:{virtuals: true}})
categorySchema.virtual('subcategories',{
    ref:"Subcategory",
    localField:"_id",
    foreignField:"category"
})
//model
export const Category = model('Category',categorySchema) 