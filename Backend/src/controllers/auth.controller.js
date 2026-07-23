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
       const user = await userModel.create({
        name: name, 
        email: email, 
        password: hash, 
        branch: branch, 
        year: year, 
        profileImage: profileImage, 
    });

    const accessToken = jwt.sign({_id:user._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"});
    const refreshToken = jwt.sign({_id:user._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:"7d"});

    await userModel.findByIdAndUpdate(user._id , {refreshToken:refreshToken});
 


    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:true,
    }).cookie("accessToken" , accessToken,{
        httpOnly:true,
        secure:true,
    })

    return res.status(200).json({
        message:"User registered successfully",
        user,
        accessToken,
    });
}

async function loginUser(req,res){
    const {email , password} = req.body;
    const user = await userModel.findOne({email});
    if(user){
        const isMatch = await bcrypt.compare(password, user.password);
        if(isMatch){
            const accessToken = jwt.sign({_id:user._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"});
            const refreshToken = jwt.sign({_id:user._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:"7d"});
            await userModel.findByIdAndUpdate(user._id , {refreshToken:refreshToken});
            res.cookie("refreshToken",refreshToken,{
                httpOnly:true,
                secure:true,
            }).cookie("accessToken" , accessToken,{
                httpOnly:true,
                secure:true,
            })
            return res.status(200).json({
                message:"User logged in successfully",
                user,
                accessToken,
            });
        }
    }
    return res.status(400).json({
        message:"Invalid credentials",
    });
}

async function logoutUser(req,res){
   const accessToken = req.cookies.accessToken;
   const refreshToken = req.cookies.refreshToken;
   if(!accessToken || !refreshToken){
       return res.status(400).json({
           message:"No token found",
       });
   }
   const decodedRefreshToken = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
   await userModel.findByIdAndUpdate(decodedRefreshToken._id , {refreshToken:null});
   res.clearCookie("refreshToken").clearCookie("accessToken");
   return res.status(200).json({
       message:"User logged out successfully",
   });
}

async function getCurrentUser(req,res){
    const accessToken = req.cookies.accessToken;
    if(!accessToken){
        return res.status(401).json({
            message:"Unauthorized",
        });
    }
    const decodedToken = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
    const {_id} = decodedToken;
    const user = await userModel.findById(_id);
    return res.status(200).json({
        message:"User fetched successfully",
        user,
    });
}

async function refreshTokens(req,res){
    let refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        return res.status(401).json({
            message:"Unauthorized",
        });
    }
    const decodedRefreshToken = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
    const {_id} = decodedRefreshToken;
    const user = await userModel.findById(_id);
    if(!user){
        return res.status(404).json({
            message:"User not found",
        });
    }
    const accessToken = jwt.sign({_id:user._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"});
    refreshToken = jwt.sign({_id:user._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:"7d"});
    await userModel.findByIdAndUpdate(user._id , {refreshToken:refreshToken});
    res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        secure:true,
    }).cookie("accessToken" , accessToken,{
        httpOnly:true,
        secure:true,
    })
    return res.status(200).json({
        message:"Tokens refreshed successfully",
        user,
        accessToken,
    });
}


async function verifyRefreshtoken(req,res){
    const refreshToken = req.cookies.refreshToken;
    if(refreshToken){
        return res.status(200).json({
            message:"Token is valid",
        });
    }
    return res.status(401).json({
        message:"Token is invalid", 
    });
}
export {registerUser, loginUser , logoutUser , getCurrentUser , refreshTokens};