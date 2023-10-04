const express=require("express");
const jwt=require("jsonwebtoken")
const { userModel } = require("../models/user.model");
const userRouter=express.Router()
require('dotenv').config()
const secretKey=process.env.secretKey

userRouter.post("/signin",async(req,res)=>{
    const {phone}=req.body;
    try {
        if(phone){
          const existingPhone = await userModel.findOne({phone:phone})
          if(existingPhone.phone){
            const token = jwt.sign({ user: existingPhone }, secretKey);
            return res.status(200).json({token,user:existingPhone})
          }else{
            const newPhone= new userModel({phone:phone})
            const user=newPhone.save()
            const token = jwt.sign({user:user},secretKey);
            return res.status(200).json({token,user:user})
          }
        }else{
            return res.status(400).json({error:'Please provide phone number'})
        }
    } catch (error) {
        res.status(400).json({error:error})
    }
})

module.exports={
    userRouter
}