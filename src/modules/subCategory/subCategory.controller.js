import slugify from "slugify"
import { Category, Subcategory } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/messages.js"

// add subCategory 
export const addSubCategory = async (req,res,next)=>{
    // get data from req
    const {name,category} = req.body
    name = name.toLowerCase()
    // check existance
    const categoryExist =await Category.findById(category)
    if(!categoryExist){
        return next(new AppError(messages.category.notFound, 404))
    }
    const subCategoryExist = await Subcategory.findOne({name})
    if(!subCategoryExist){
        return next(new AppError(messages.subcategory.alreadyExist, 409))
    }
    //prepare data 
    const slug = slugify(name,{replacement:"-"})
    const subCategory= new Subcategory({
        name,
        slug,
        image:{path:req.file?.path},
        category,
        createdBy:req.authUser._id
    })
    const createdSubcategory = await subcategory.save()
    if(!createdSubcategory){
        return next(new AppError(messages.subcategory.failToCreate, 500))
    }
    // send response
    return res.status(201).json({
        message:messages.subcategory.createdSuccessfully,
        success:true,
        data:createdSubcategory})

}
// get allCategories
export const getAllSubCategories =async (req,res,next)=>{
    const subCategories= await Subcategory.find().populate([{path:"subCategories",populate:[{path:"category"}]}])
    return res.status(200).json({
        success:true,
        data:subCategories})
}