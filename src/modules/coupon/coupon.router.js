import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAthorized } from "../../middleware/authorzation.js";
import { roles } from "../../utils/constant/enums.js";
import { isValid } from "../../middleware/validation.js";
import { addCouponVal } from "./coupon.validation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addCoupon } from "./coupon.controller.js";

const couponRouter = Router()
// add coupon 
couponRouter.post('/',
    isAuthenticated(),
    isAthorized([roles.ADMIN]),
    isValid(addCouponVal),
    asyncHandler(addCoupon)
)

export default couponRouter