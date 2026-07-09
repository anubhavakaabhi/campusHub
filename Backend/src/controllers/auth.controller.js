import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";




async function registerUser(req,res){
    const {name, email, password, branch, year, profileImage} = req.body;
    const existedUser = await userModel.findOne({email});
    if(existedUser){
        return res.status(400).json({
            message:"User already exists",
        })
    }

    

}

export {registerUser};