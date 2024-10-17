import { Router } from "express";
import { cloudUploads } from "../../utils/multer-cloud.js";
import { isValid } from "../../middleware/validation.js";
import { addProductVal } from "./product.validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addProduct, getAllProduct } from "./product.controller.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAthorized } from "../../middleware/authorzation.js";
import { roles } from "../../utils/constant/enums.js";

const productRouter = Router()
// add product 
productRouter.post('/',
    isAuthenticated(),
    isAthorized([roles.ADMIN , roles.SELLER]),
    cloudUploads({}).fields([{name:'mainImage',maxCount:1},{name:'subImages',maxCount:5}]),
isValid(addProductVal),
asyncHandler(addProduct))

// get product 
productRouter.get('/',asyncHandler(getAllProduct))
export default productRouter