import { globalErrorHandling } from "./middleware/asyncHandler.js";
import { authRouter, brandRouter, categoryRouter, couponRouter, productRouter, reviewRouter, subCategoryRouter, wishlistRouter } from "./modules/index.js";
export const bootStrap=(app,express) => {
    //parse req
    app.use(express.json())
    //public folder
    app.use('/uploads',express.static('uploads'))
    //routeing
    app.use('/category',categoryRouter),
    app.use('/subCategory',subCategoryRouter),
    app.use('/brand',brandRouter),
    app.use('/product',productRouter)
    app.use('/auth',authRouter),
    app.use('/review',reviewRouter)
    app.use('/coupon', couponRouter)
    app.use('/wishlist', wishlistRouter)
    // global error handling
    app.use(globalErrorHandling)


}