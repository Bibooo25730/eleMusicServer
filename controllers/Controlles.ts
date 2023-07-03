import {Response,Request} from "express";
const asyncHandler = require("express-async-handler")
import Contact from "../models/contactModel";

//@desc @get

const createContact =asyncHandler(async (req:Request,res:Response)=>{
    try {
        const contacts = await Contact.find();
        console.log(contacts)
        res.status(201).json(contacts);
    } catch (error) {
        console.error("查询失败", error);
        res.status(500).json({ message: "服务器错误" });
    }

})

const createGet = asyncHandler(async (req:Request,res:Response)=>{
     const id = req.params.id
    try {
        const contacts = await Contact.findById(id)
        res.status(200).json(contacts)
    } catch (error){
         res.status(400)
         throw new Error("not found")
    }

})


//@desc @update
const createUpdate = asyncHandler (async (req:Request,res:Response)=>{
    console.log(req.body)
    const {name,email,phone} = req.body
    if(!name||!email||!phone){
        res.status(400);
        throw new Error("All fields are mandatory !")
    }try {
        const contact = await Contact.create({
            name,
            email,
            phone
        });
        res.status(200).json(contact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '创建联系人失败' });
    }
})
//@desc @put
const createPut =asyncHandler(async (req:Request,res:Response)=>{
    const id = req.params.id;
    const contacts = await Contact.findById(id)
    if(!contacts){
        res.status(400)
        throw  new Error("not found")
    }
    const updatePut = await  Contact.findByIdAndUpdate(
        id,
        req.body,
        {new:true}
    )
    res.status(200).json(updatePut)
})
//@desc @delete
const createDelete = asyncHandler(async (req:Request,res:Response)=>{
    const id = req.params.id;
    const contact = await  Contact.findByIdAndRemove(id)
    res.status(200).json(contact)
})

module.exports = {
    createContact,
    createUpdate,
    createPut,
    createDelete,
    createGet
};