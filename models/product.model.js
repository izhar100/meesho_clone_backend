const mongoose=require("mongoose")
const productSchema=mongoose.Schema({
   name:{type:String,required:true},
   category:{type:String,required:true},
   price:{type:Number,required:true},
   image1:{type:String,required:true},
   image2:String,
   gender:String,
   size:[String],
   origin:String,
   description:String,
   fabric:String,
   quantity:Number,
   pattern:String,
   material:String
},{
    versionKey:false
})

const productModel=mongoose.model("product",productSchema)

module.exports={
    productModel
}