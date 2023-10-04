const express=require("express")
const { orderModal } = require("../models/orders.model")
const orderRouter=express.Router()

orderRouter.post("/",async(req,res)=>{
    try {
        const {order}=req.body
        const newOrder=new orderModal(order)
        await newOrder.save()
        res.status(200).json({message:"Order Placed"})
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports={
    orderRouter
}