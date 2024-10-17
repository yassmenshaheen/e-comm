import joi from 'joi'
import { generalFields } from '../../middleware/validation.js'
export const addCategoryVal = joi.object({
    name:generalFields.name.required()
})
//update category
export const updateCategoryVal = joi.object({
    name:generalFields.name,
    categoryId:generalFields.objectId.required()
})