import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const AdminSchema=new mongoose.Schema({
    name:{
      type:String,
      required:[true,"please enter your name"]
    },
   username:{
    type:String,
    required: [true, "username is required"],
    unique: [true, "username should be unique"],
    trim: true,
    index: true,
    lowercase: true
   },
   password:{
    type:String,
    required:[true,"password is required"]
   },
   email:{
    type:String,
    required:[true,"please enter the email"]
   },
   refreshToken:{
    type:String
   }
},{timestamps:true})

AdminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) { return next(); }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

AdminSchema.methods.isPasswordTrue = async function (password) {
    return await bcrypt.compare(password, this.password);
}

AdminSchema.methods.jwtAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        username: this.username,
        email: this.email
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    });
}

AdminSchema.methods.jwtRefreshToken = function () {
    return jwt.sign({
        _id: this._id
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    });
}

export const Admin = mongoose.model('Admin', AdminSchema);