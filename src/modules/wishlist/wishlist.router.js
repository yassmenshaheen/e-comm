import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAthorized } from "../../middleware/authorzation.js";
import { roles } from "../../utils/constant/enums.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addToWishList } from "./wishlist.controller.js";

const wishlistRouter = Router()

 // add to wishlist
 wishlistRouter.post('/',
    isAuthenticated(),
    isAthorized([roles.ADMIN, roles.USER]),
    asyncHandler(addToWishList)
 )

export default wishlistRouter