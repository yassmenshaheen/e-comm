import { Coupon } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { discountTypes } from "../../utils/constant/enums.js"
import { messages } from "../../utils/constant/messages.js"

export const addCoupon = async (req,res,next)=>{
    // get data from req 
    const {code , discountAmount , discountType , toDate , fromDate} = req.body
    const userId = req.authUser._id
     // check coupon exist 
     const couponExist = await Coupon.findOne({code})
     if(!couponExist){
        next(new AppError(messages.coupon.alreadyExist , 409))
     }
     // check if percentage 
     if(discountType==discountTypes.PERCENTAGE && discountAmount > 100)
        return next(new AppError("must be less than 100 " , 400))
    // prepare data 
    const coupon = new Coupon({
        code,
        discountAmount,
        discountType,
        toDate,
        fromDate,
        createdBy:userId
    })
    // add to db
    const createdCoupon = await Coupon.save()
    if(!createdCoupon){
        next(new AppError(messages.coupon.failToCreate, 500))
    }
    // send response 
    return res.status(201).json({
        message:messages.coupon.createdSuccessfully,
        success:true,
        data:createdCoupon
    })


}