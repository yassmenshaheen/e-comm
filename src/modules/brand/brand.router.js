import { Router } from "express";
import { cloudUploads } from "../../utils/multer-cloud.js";
import { isValid } from "../../middleware/validation.js";
import { addBrandVal, updateBrandVal } from "./brand.validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addBrand, updateBrand } from "./brand.controller.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAthorized } from "../../middleware/authorzation.js";
import { roles } from "../../utils/constant/enums.js";

const brandRouter = Router()

// add brand 
brandRouter.post('/',
    isAuthenticated(),
    isAthorized([roles.ADMIN , roles.SELLER]),
    cloudUploads().single('logo'),
isValid(addBrandVal),
asyncHandler(addBrand))
export default brandRouter

// update brand 
brandRouter.put('/:brandId',
    isAuthenticated(),
    isAthorized([roles.ADMIN , roles.SELLER]),
    cloudUploads({}).single('logo'),
    isValid(updateBrandVal),
    asyncHandler(updateBrand)
)