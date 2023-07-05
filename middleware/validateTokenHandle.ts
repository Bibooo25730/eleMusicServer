import { Request, Response,NextFunction } from "express";
const asyncHandle = require("express-async-handler")
const jwt = require("jsonwebtoken")


const validateToken = asyncHandle(async (req:Request,res:Response,next:NextFunction)=>{
    console.log('123')
    let token;
    const auth = req.headers.Authorization || req.headers.authorization;
    if(auth && (auth as string).startsWith("Bearer")){
          token = (auth as string).split(" ")[1]
          console.log(token)
          jwt.verify(token,process.env.SECRETKEY,(err:string,decoded:Object)=>{
               if(err){
                   res.status(400)
                   throw Error("jwt is valid")
               }
               // @ts-ignore
              req.user = decoded.user
              next()
          })
        if(!token){
            res.status(401)
            throw new Error("token is null")
        }
    }else{
        console.log('213')
        res.status(400)
        throw Error("auth is valid")
    }

})
module.exports= validateToken