import slugify from 'slugify'
import { Category } from "../../../db/index.js"
import {AppError} from '../../utils/appError.js'
import { messages } from "../../utils/constant/messages.js"
import { deleteFile } from '../../utils/file.js'

//add category
export const addCategory = async (req,res,next)=>{
    //get data from req
    let {name} = req.body
    name= name.toLowerCase()
    //check existance
    const categoryExist = await Category.findOne({name})
    if(categoryExist){
       return next(new AppError(messages.category.alreadyExist, 409))
    }
    //prepare data
    const slug = slugify(name) 
    const category = new Category({
        name,
        slug,
        image:{path:req.file.path},
        createdBy: req.authUser._id
    })
    const createdCategory =await category.save()
    if(createdCategory){
        return next(new AppError(messages.category.failToCreate, 500))
    }
    // send response
    return res.status(201).json({
        message:messages.category.createdSuccessfully, 
        success:true,
        data:createdCategory})
   
}
// get allCategories
export const getAllCategories =async (req,res,next)=>{
    const categories= await Category.find().populate([{path:"categories",populate:[{path:"category"}]}])
    return res.status(200).json({
        success:true,
        data:categories})
}
//update category 
export const updateCategory = async (req,res,next)=>{
    // get data from req
    const {name} = req.body
    const {categoryId} = req.pramas
    // check existance
    const categoryExist = await Category.findById(categoryId)
    if(!categoryExist){
       return  next(new AppError(messages.category.notFound, 404))
    }
    // check name exist 
    const nameExist = await Category.findOne({name})
    if(nameExist){
        return next(new AppError(messages.category.alreadyExist, 409))
    }
    // prapare data 
    if(name){
        categoryExist.slug = slugify(name)
    }
    // update image
    if(req.file){
        deleteFile(categoryExist.image.path)
        categoryExist.image={path: req.file.path}
    }
    // update to db
    const updatedCategory = await categoryExist.save()
    if(!updateCategory){
        return next(new AppError(messages.category.failToUpdate, 500))
    }
    // send response
    return res.status(200).json({
        message:messages.category.updatedSuccessfully,
        success:true,
        data:updatedCategory})
}
// delete category 
export const deleteCategory = async (req,res,next)=>{
    // get data from req
    const {categoryId} = req.pramas
   
    // check existance
    const categoryExist = await Category.findByIdAndDelete(categoryId)
    if(!categoryExist){
       return  next(new AppError(messages.category.notFound, 404))
    }
    //delete image
        deleteFile(categoryExist.image.path)
    // send response
    return res.status(200).json({
        message:messages.category.deletedSuccessfully,
        success:true,
    
        
    })

}
