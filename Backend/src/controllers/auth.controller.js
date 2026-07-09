import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";




async function registerUser(req,res){
    const {name, email, password, branch, year, profileImage} = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({
            message:"All fields are required",
        })
    }
    const existedUser = await userModel.findOne({email});
    if(existedUser){
        return res.status(400).json({
            message:"User already exists",
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({name: name, email: email, password: hash, branch: branch, year: year, profileImage: profileImage});

    const accessToken = jwt.sign({_id:user._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"});
    const refreshToken = jwt.sign({_id:user._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:"7d"});

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        maxAge:1000 * 60 * 60 * 24 * 7,
    })

    return res.status(200).json({
        message:"User registered successfully",
        user,
        accessToken,
    });
}

async function loginUser(req,res){
    const {email , password} = req.body;
}

export {registerUser};