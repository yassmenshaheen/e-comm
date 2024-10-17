import slugify from "slugify"
import { Brand, Product, Subcategory } from "../../../db/index.js"
import { AppError } from "../../utils/appError.js"
import { messages } from "../../utils/constant/messages.js"
import cloudinary from "../../utils/cloud.js"
import { ApiFeature } from "../../utils/ApiFeature.js"

// add product
export const addProduct = async(req,res,next)=>{
    // get data from req
    let{  name,
        description,
        stock,
        price,
        discount,
        discountType,
        colors,
        sizes,
        categort,
        subcategory,
        brand} = req.body

    // check existance
    //1- check brand 
    const brandExist = await Brand.findById(brand)
    if(!brandExist){
        return next(new AppError(messages.brand.notFound, 404))
    }
    // 2- check subcategory
    const subCategoryExist = await Subcategory.findById(subcategory)
    if(!subCategoryExist){
        return next(new AppError(messages.subcategory.notFound, 404))
    }
    
    // upload image
   const {secure_url,public_id} = await cloudinary.uploader.upload(req.files.mainImage[0].path,
    {folder:"e-comm/product"})
    let mainImage = {secure_url,public_id}
    req.failImages = []
    failImages.push(public_id)
    let subImages = []

    for (const file of req.files.subImages){
        const {secure_url,public_id} = await cloudinary.uploader.upload(file.path,{
            folder:"e-comm/product"
        },
            subImages.push({secure_url,public_id}),
            req.failImages.push(public_id)
        )
    }

   // prepare data 
   const slug = slugify(name)
   const product = new Product({
    name,
    slug,
    description,
    stock,
    price,
    discount,
    discountType,
    colors:JSON.parse(colors),
    sizes:JSON.parse(sizes),
    categort,
    subcategory,
    brand,
    mainImage,
    subImages,
    createdBy:req.authUser._id,
    updatedBy:req.authUser._id
   })
    // add to db
    const createdProduct = await Product.Save()
    if(!createdProduct){
        return next(new AppError(messages.product.failToCreate, 500))
    }
    // send response
    return res.status(201).json({message:messages.Product.createdSuccessfully,
        success:true,
        data:createdProduct
    })
}
// get product
export const getAllProduct = async (req,res,next)=>{
 
    const apiFeature = new  ApiFeature(Product.find(),req.query).pagnation().select().sort().filter()
    const products = await apiFeature.mongoosrQuery
    return res.status(200).json({success:true , data: products})
}