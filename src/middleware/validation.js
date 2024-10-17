import joi from "joi"
import { AppError } from "../utils/appError.js"
import { discountTypes } from "../utils/constant/enums.js"
const parseArray = (value, helper)=>{
    let data = JSON.parse(value)
    let schema = joi.array().items(joi.string())
    const {error} = schema.validate(data)
    if(error){
        return helper(error.details)
    }
    return true
}
export const generalFields = {
    name:joi.string(),
    objectId:joi.string().hex().length(24),
    description:joi.string(),
    stock:joi.number().positive(),
    price:joi.number().positive(),
    discount:joi.number(),
    discountType:joi.number().valid(...Object.values(discountTypes)),
    colors:joi.custom(parseArray),
    sizes:joi.custom(parseArray),
    rate:joi.number().min(1).max(5),
    email:joi.string().email(),
    phone:joi.string().pattern(new RegExp(/^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/)),
    password:joi.string().pattern(new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)),
    cPassword:joi.string().valid(joi.ref('password')),
    DOB:joi.string()

}

export const isValid = (schema)=>{
    return (req,res,next)=>{
        let data = {...req.body,...req.params,...req.query}
        const{error}= schema.validate(data, {abortEarly:false})
        if(error){
            let errArr=[]
            error.details.forEash((err)=>{errArr.push(err.message)})
            return next(new AppError(errArr.details,400))
        }
        next()
    }

}