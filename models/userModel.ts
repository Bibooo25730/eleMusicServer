import mongoose from "mongoose";

const uesrSchems = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"Please add the user name"]
    },
    email:{
        type:String,
        required:[true,"Please add the user email"],
        unique:[true,"Email address already taken"]
    },
    password:{
        type:String,
        required:[true,"Please add the user password"]
    },
},{
    timestamps:true
})

module.exports=mongoose.model("User",uesrSchems)