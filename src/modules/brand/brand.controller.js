import { Brand } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/messages.js"
import cloudinary from "../../utils/cloud.js"
import slugify from "slugify"

export const addBrand = async (req,res,next)=>{
    //get data from req
    let {name} = req.body
    name= name.toLowerCase()
    //check existance
    const brandExist = await Brand.findOne({name})
    if(brandExist){
        return next(new AppError(messages.brand.alreadyExist, 409))
    }
    //upload image
    const {secure_url, public_id} = await cloudinary.uploader.upload(req.file.path,{
        folder:'e-comm/brand'
    })
    //prepare data
    const slug = slugify(name)
    const brand = new Brand({
        name,
        slug,
        logo:{secure_url, public_id},
        createdBy:req.authUser._id
    })
    // add to db
    const createdBrand = await Brand.Save()
    if(!createdBrand){
        //rollback
        req.failImage={secure_url, public_id}
        next(new AppError(messages.brand.failToCreate, 500))
    }

    //send response
    return res.status(201).json({
        message:messages.brand.createdSuccessfully,
        success:true,
        data:createdBrand
    })
}
// update brand
export const updateBrand = async (req,res,next)=>{
    // get data from req
    let {name} = req.body
    const {brandId} = req.params
    name = name.toLowerCase()
    // check existance
    const brandExist = await Brand.findById(brandId)
    if(!brandExist){
        return next(new AppError(messages.brand.notFound, 404))
    }
    //check name exist
    const nameExist = await Brand.findOne({name,_id: {$ne:brandId}})
    if(nameExist){
        return next(new AppError(messages.brand.alreadyExist, 409))
    }
    // prepare data 
    if(name){
        const slug = slugify(name)
        brandExist.name = name
        brandExist.slug = slug
    }
    // upload image
    if(req.file){
        //delete old image
        //  await cloudinary.uploader.destroy(brandExist.logo.public_id)
        // update image
        const {secure_url,public_id} = await cloudinary.uploader.upload(req.file.path,{
           public_id: brandExist.logo.public_id
    })
    brandExist.logo ={secure_url,public_id} 
    req.failImage ={secure_url,public_id} 
    }
    // update to db
    const updatedBrand = await brandExist.save()
    if(!updatedBrand){
        return next(AppError(messages.brand.failToCreate, 500))
    }

    // send response
    return res.status(200).json({message:messages.brand.updatedSuccessfully,
        success:true,
        data:updatedBrand
    })
}
 // delete brand 
 export const deleteBrand = async (req,res,next)=>{
    // get data from req 
    const {brandId} = req.params
     // check existance
     const brandExist = await Brand.findByIdAndDelete(brandId)
     if(!brandExist){
        return  next(new AppError(messages.brand.notFound, 404))
     }
     // send response
     return res.status(201).json({
        message:messages.brand.deletedSuccessfully , 
        success:true}
     )
 }
 // get all brands
 export const getAllBrand = async (req,res,next)=>{
        const brands= await Brand.find()
        return res.status(200).json({
            success:true,
            data:brands})
    }
 
