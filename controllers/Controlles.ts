import {Response,Request} from "express";
const asyncHandler = require("express-async-handler")
import Contact from "../models/contactModel";

//@desc @get
//@desc private

const createContact =asyncHandler(async (req:Request,res:Response)=>{
    try {
        // @ts-ignore
        const contacts = await Contact.find({user_id:req.user.id});
        res.status(201).json(contacts);
    } catch (error) {
        res.status(403)
        throw new Error('查询失败')
    }

})
//@desc public
//@desc private
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


//@desc @Create
//@desc private
const createCreate = asyncHandler (async (req:Request,res:Response)=>{
    console.log(req.body)
    const {name,email,phone} = req.body
    if(!name||!email||!phone){
        res.status(400);
        throw new Error("All fields are mandatory !")
    }try {
        const contact = await Contact.create({
            name,
            email,
            phone,
            // @ts-ignore
            user_id:req.user.id
        });
        res.status(200).json(contact);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '创建联系人失败' });
    }
})
//@desc @put
//@desc private
const createPut =asyncHandler(async (req:Request,res:Response)=>{
    const id = req.params.id;
    const contacts = await Contact.findById(id)
    if(!contacts){
        res.status(400)
        throw  new Error("not found")
    }
    // @ts-ignore
    if(contacts.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("你无权更新此用户信息")
    }
    const updatePut = await  Contact.findByIdAndUpdate(
        id,
        req.body,
        {new:true}
    )
    res.status(200).json(updatePut)
})
//@desc @delete
//@desc public
const createDelete = asyncHandler(async (req:Request,res:Response)=>{
    const id = req.params.id;
    const contacts = await Contact.findById(id)
    if(!contacts){
        res.status(400)
        throw  new Error("not found")
    }
    // @ts-ignore
    if(contacts.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("你无权更新此用户信息")
    }
    // @ts-ignore
    await Contact.deleteOne({user_id:req.user.id})
    // const contact = await  Contact.findByIdAndRemove(id)
    res.status(201).json(contacts)
})

module.exports = {
    createContact,
    createCreate,
    createPut,
    createDelete,
    createGet
};