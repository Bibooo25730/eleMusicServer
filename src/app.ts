const express = require("express")
import {Response,Request} from "express";
const errHandler = require("../middleware/errMiddleware")
const dotenv = require("dotenv").config()
const app =express()
const port = process.env.PORT || 5000
app.use(express.json())
app.use("/api/musicPlay",require("../routes/musicPlay"))
app.use(errHandler)
app.listen(port,()=>{
    console.log(`server ,${port}`)
})