const mongoose=require("mongoose")

const orderSchema=mongoose.Schema({
    user:{},
    cartItem:[],
    deliveryAddress:{},
    amount:Number,
    paymentStatus:String,
    paymentmode:String

},{
    versionKey:false
})

const orderModal=mongoose.model("order",orderSchema)

module.exports={
    orderModal
}