import {Response,Request} from "express";
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

const createRegister = asyncHandler(async (req:Request,res:Response)=>{
     const { username,email,password} = req.body;
     if(!username||!email||!password){
         res.status(400)
         throw new Error("all fields are mandatory!")
     }
     const userAvailable = await User.findOne(email)
     if(userAvailable){
         res.status(400)
         throw new Error("User already registered!")
     }
     res.status(200).json('ok')
})

const createLogin = asyncHandler(async (req:Request,res:Response)=>{
    res.status(200).json('ok')
})

const createCurrent = asyncHandler(async (req:Request,res:Response)=>{
    res.status(200).json('ok')
})

module.exports = {createRegister,createLogin,createCurrent}