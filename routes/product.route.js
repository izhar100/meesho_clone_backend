const express=require("express")
const { productRoutes } = require("../configs/productRoutes")
const productRouter=express.Router()

productRouter.get("/",productRoutes.get)

productRouter.post("/",productRoutes.post)

productRouter.patch("/:id",productRoutes.update)

productRouter.delete("/:id",productRoutes.delete)

productRouter.get("/:id",productRoutes.getSingleProduct)

module.exports={
    productRouter
}