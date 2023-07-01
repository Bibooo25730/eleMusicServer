const express= require("express");
import {request, response, ErrorRequestHandler, NextFunction, Request, Response} from "express";
import createError,{HttpError} from 'http-errors';
const {constants} = require("../constants")
const errHandler=(err:HttpError,
                  req:Request,
                  res:Response,
                  next:NextFunction)=> {
   const statusCode = err.statusCode ? err.statusCode : 500;
   switch (statusCode){
       case constants.VALIDATE_STATUS:
           res.json({
               title:"验证不成功",
               message: err.message,
               stackTrace:err.stack
           });
           break;
       case constants.NOT_FOUND_ERR:
           res.json({
               title:"404",
               message: err.message,
               stackTrace:err.stack
           })
           break;
       case constants.UNAUTHORIZED:
           res.json({
               title:"未经授权",
               message: err.message,
               stackTrace:err.stack
           })
           break;
       case constants.FORBIDDEN:
           res.json({
               title:"禁止",
               message: err.message,
               stackTrace:err.stack
           })
           break;
       case constants.SECURITY_ERR:
           res.json({
               title:"服务器错误",
               message: err.message,
               stackTrace:err.stack
           })
           break;
       default:
           console.log("没有错误,All good")
           break;
   }
}
module.exports=errHandler