import { globalErrorHandling } from "./middleware/asyncHandler.js"
import { authRouter, brandRouter, categoryRouter, productRouter, subCategoryRouter } from "./modules/index.js"

export const initApp = (app , express) =>{
    //parse req
    app.use(express.json())
    app.use('/uploads',express.static('uploads'))
    
    // routing
    app.use('/category', categoryRouter)
    app.use('/subCategory',subCategoryRouter)
    app.use('/brand', brandRouter)
    app.use('/product', productRouter)
    app.use('/auth', authRouter)

    
    //lobalErrorHandling
   app.use(globalErrorHandling)

}
