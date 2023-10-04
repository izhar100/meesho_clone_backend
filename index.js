const express=require("express")
const app=express()
const cors=require("cors")
const { connection } = require("./db")
const { productRouter } = require("./routes/product.route")
const { userRouter } = require("./routes/user.route")
const { paymentRouter } = require("./routes/payment")
const { orderRouter } = require("./routes/order.route")
app.use(express.json())
app.use(cors())
app.use("/product",productRouter)
app.use("/user",userRouter)
app.use("/payment",paymentRouter)
app.use("/order",orderRouter)
require("dotenv").config()
app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to database")
        console.log(`server is running at port: ${process.env.port||8080}`)
    } catch (error) {
        console.log(error)
    }
})