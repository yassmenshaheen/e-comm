import { Router } from "express";
import { isAuthenticated } from "../../middleware/authentication.js";
import { isAthorized } from "../../middleware/authorzation.js";
import { roles } from "../../utils/constant/enums.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { addReview } from "./review.controller.js";

const reviewRouter = Router()
// add review 
reviewRouter.post('/:productId',
    isAuthenticated(),
    isAthorized([roles.ADMIN , roles.USER]),
    asyncHandler(addReview)
)
export default reviewRouter