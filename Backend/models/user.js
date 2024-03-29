import mongoose from "mongoose";
const Schema=mongoose.Schema;
import passportLocalMongoose from "passport-local-mongoose";

const userSchema=new Schema({
    name:{
        type:String,
        required:true,
        maxLength:50,
    },
    DOB:{
        type:Date,
        required:true,
    },
    username:{
        type:String,
        required:true,
        maxLength:50,
        unique:true,
    },
});

userSchema.plugin(passportLocalMongoose);
const User=mongoose.model("user",userSchema);

export default User;
