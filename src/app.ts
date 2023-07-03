const express = require("express")
import {Response,Request} from "express";
const errHandler = require("../middleware/errMiddleware")
const connectDb = require("../config/dbConnection")
const dotenv = require("dotenv").config()
const app = express()

async function startApp() {
    try {
        await connectDb();
        // 数据库连接成功后，可以在这里执行其他业务逻辑
    } catch (error) {
        console.error("无法连接到数据:", error);
    }
}
startApp();
const port = process.env.PORT || 5000
app.use(express.json())
app.use("/api/musicPlay",require("../routes/musicPlay"))
app.use("/api/users",require("../routes/userRoutes"))
app.use(errHandler)
app.listen(port,()=>{
    console.log(`server ,${port}`)
})