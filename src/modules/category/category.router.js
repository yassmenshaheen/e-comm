import {Router} from 'express'
import { fileUploads } from '../../utils/multer.js'
import { isValid } from '../../middleware/validation.js'
import { addCategoryVal, updateCategoryVal } from './category.validation.js'
import { asyncHandler } from '../../middleware/asyncHandler.js'
import { addCategory, deleteCategory, getAllCategories, updateCategory } from './category.controller.js'
import { isAuthenticated } from '../../middleware/authentication.js'
import { isAthorized } from '../../middleware/authorzation.js'
import { roles } from '../../utils/constant/enums.js'
const categoryRouter = Router()
// add category 

categoryRouter.post('/',
    isAuthenticated(),
    isAthorized([roles.ADMIN, roles.SELLER]),
    fileUploads({folder:"category"}).single('image'),
isValid(addCategoryVal),
 asyncHandler(addCategory))


// get categories
 categoryRouter.get('/category',asyncHandler(getAllCategories))
 
// update category
categoryRouter.put('/:categoryId',
    fileUploads({folder:"category"}).single('image'),
    isValid(updateCategoryVal),
    asyncHandler(updateCategory)
)
// delete category
categoryRouter.delete('/:categoryd',
    asyncHandler(deleteCategory)
)
export default categoryRouter
