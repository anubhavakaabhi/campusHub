import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        unique: [true, "Email is already in use"],
        required: true
    },
    password:{
        type:String,
        required: true,
    },
    branch:{
        type:String,
        enum: ['CS','IT','ECE','EEE','MECH','CIVIL']
    },
    year:{
        type:Number,
        min:1,
        max:4,
    },
    profileImage:{
        type:String,
    }
    
})

const userModel = mongoose.model("users", userSchema)

export default userModel;