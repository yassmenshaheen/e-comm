import { model, Schema } from "mongoose";

//schema
const subcategorySchema = new Schema({
    name:{
        type:String,
        image:Object,
        createdBy: {
            type:Schema.Types.ObjectId,
            ref:"User",
            required: true
        },
        category:{
            type:Schema.Types.ObjectId,
            ref:"Category",
            required:true

        }

    }
},{timeseries:true})
//model
export const Subcategory = model('Subcategory',subcategorySchema)