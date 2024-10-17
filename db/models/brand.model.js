import { model, Schema } from "mongoose";

// schema
const brandSchema= new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true

    },
    slug:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true

    },
    logo:{
        secure_url:{
            type:String,
            required:true
        },
        public_id:{
            type:String,
            required:true 
        }
    },
    cretedBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required: true
    }
},{timeseries:true})
// model
export const Brand = model('Brand',brandSchema)