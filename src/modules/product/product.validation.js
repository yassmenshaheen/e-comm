import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const addProductVal = joi.object({
    name:generalFields.name.required(),
    description:generalFields.description.required(),
    stock:generalFields.stock,
    price:generalFields.price.required(),
    discount:generalFields.discount,
    discountType:generalFields.discountType,
    colors:generalFields.colors,
    size:generalFields.sizes,
    categort:generalFields.objectId.required(),
    subcategory:generalFields.objectId.required(),
    brand:generalFields.objectId.required(),
    



})