import {Router} from 'express'
import { fileUploads } from '../../utils/multer.js'
import { isValid } from '../../middleware/validation.js'
import { addSubCategoryVal } from './subCategory.validation.js'
import { asyncHandler } from '../../middleware/asyncHandler.js'
import { addSubCategory, getAllSubCategories } from './subCategory.controller.js'
import { isAuthenticated } from '../../middleware/authentication.js'
import { isAthorized } from '../../middleware/authorzation.js'
import { roles } from '../../utils/constant/enums.js'
const subCategoryRouter = Router()

// add subCategory 
subCategoryRouter.post('/',
    isAuthenticated(),
    isAthorized([roles.ADMIN , roles.SELLER]),
    fileUploads({folder:'subCategory'}).single('image'),
isValid(addSubCategoryVal),
asyncHandler(addSubCategory))

// get categories
subCategoryRouter.get('/subCategory',asyncHandler(getAllSubCategories))
export default subCategoryRouter