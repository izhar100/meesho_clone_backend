const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    phone:{type:String,required:true},
},{
    versionKey:false
})

const userModel=mongoose.model("user",userSchema)
module.exports={
    userModel
}