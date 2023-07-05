import {Response,Request} from "express";
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt =require("jsonwebtoken")

//@desc 注册
//@desc public
const createRegister = asyncHandler(async (req:Request,res:Response)=>{
     const { username,email,password} = req.body;
     if(!username||!email||!password){
         res.status(400)
         throw new Error("all fields are mandatory!")
     }
     const userAvailable = await User.findOne({email})
     if(userAvailable){
         res.status(400)
         throw new Error("User already registered!")
     }
    let rounds: string | undefined = process.env.ROUNDS;
    let parsedRounds = parseInt(rounds as string, 10);
    bcrypt.genSalt(parseInt(parsedRounds.toString()),function (err:Error, salt:string){
        if(err){
            throw new Error("bcrypt ??")
        }else{
           bcrypt.hash(password,salt, async function  (err:Error,hash:string){
               if(err) {
                   throw new Error("bcrypt ??")
               }else{
                   let user = await User.create({
                           username,
                           email,
                           password:hash
                   })
                   console.log(`user created ${user}`)
                   if(user){
                       res.status(201).json({_id:user.id,email:user.email})
                   }else{
                       res.status(400)
                       throw new Error("User data us not valid")
                   }

               }
           })
        }

    })


})
//@desc 登陆
//@desc public
const createLogin = asyncHandler(async (req:Request,res:Response)=>{
    const {email,password} = req.body
    if(!email||!password){
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    let user = await User.findOne({email})
    console.log(user)
    if(user && bcrypt.compare(user.password,password)){
        const token = jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            }
        },process.env.SECRETKEY,{expiresIn: '1h' })
        res.status(200).json({token})
    }else{

        res.status(400)
        throw new Error("email or password is valid")
    }


})
//@desc user info
//@desc private
const createCurrent = asyncHandler(async (req:Request,res:Response)=>{
    // @ts-ignore
    res.status(200).json(req.user)
})

module.exports = {createRegister,createLogin,createCurrent}