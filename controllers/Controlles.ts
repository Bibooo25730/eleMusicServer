const express = require("express");
import {Response,Request} from "express";

const router = express.Router();
//@desc @get
const createContact = (req:Request,res:Response)=>{
    res.status(200).json({message:`Get contact for ${req.params.id}`})
}
//@desc @update
const createUpdate = (req:Request,res:Response)=>{
    console.log(req.body)
    const {name} = req.body
    if(!name){
        res.status(400);
        throw new Error("All fields are mandatory !")
    }
    res.status(200).json({message:`Get contact fo ${req.params.id}`})
}
//@desc @put
const createPut = (req:Request,res:Response)=>{
    res.status(200).json({message:`Get contact for ${req.params.id}`})
}
//@desc @delete
const createDelete = (req:Request,res:Response)=>{
    res.status(200).json({message:`Get contact for ${req.params.id}`})
}

module.exports = {
    createContact,
    createUpdate,
    createPut,
    createDelete
};