import { Product, Review  } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/messages.js"

export const addReview = async(req,res,next)=>{
    // get data from req 
    const {comment , rate} = req.body
    const{productId} = req.params
    const userId = req.authUser._id
    // check product exist
    const productExist = await Product.findById(productId)
    if(!productExist){
        next(new AppError(messages.product.notFound , 404))
    }
    // todo if user has any orders on this product
    // prapre data 
    // check if review 
    const reviewExist = await Review.findByIdAndUpdate({user:userId , product:productId}, {rate, comment},{new:true})
    let data = reviewExist
    if(reviewExist){
        const review = new Review({
            user:userId,
            product:productId,
            comment,
            rate,
            isVerified:false // todo true has any orders
    
        })
        // add to db
        const createdReview = await review.save()
        if(!createdReview){
            next(new AppError(messages.review.failToCreate , 500))
        }
        data = createdReview
    }
    // update product 
    const reviews = await Review.find({product:productId})
    let finalRate = reviews.reduse((acc,cur)=>{
        return acc+=cur.rate
    },0)
    finalRate /= reviews.length
    await Product.findByIdAndUpdate(productId , {rate:finalRate})
    // send response
    return res.stutas(201).json({
        message:messages.review.createdSuccessfully,
        success:true,
        data:createdReview
    })


}
// get reviews
export const getAllReviews = async(req,res,next)=>{
    const reviews = await Review.find()
    return res.stutas(201).json({
       success:true,
       data:reviews

    })
}
// delete reviews 
export const deletedReview = async(req,res,next)=>{
    // get data from req
    const {productId} = req.params
    // check product exist 
    const productExist = await Product.findById(productId)
    if(!productExist){
        next(new AppError(messages.product.notFound , 404))
    }
    // send response
    return res.status(201).json({
        message:messages.review.deletedSuccessfully,
        success:true
    })
}