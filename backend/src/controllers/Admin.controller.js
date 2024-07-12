import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { Admin } from "../models/Admin.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens= async(adminid)=>{
    try {
       const admin=await User.findById(adminid);

    //    console.log(user);
       
       const accessToken=admin.jwtAccessToken();
       const refreshToken= admin.jwtRefreshToken();

      console.log("access ",accessToken);
      console.log("refresh ",refreshToken);

      admin.refreshToken=refreshToken;

      await admin.save({validateBeforeSave:false});

      return {accessToken , refreshToken};
       
        
    } catch (error) {
        throw new ApiError(409,"token gen error!")
    }
}

const registerAdmin=asyncHandler(async(req,res)=>{
    //data check kr lo
    const {name,username,password,email}=req.body;

    
    if(!name || !username || !password || !email){
        throw new ApiError(400,"all fields required");
    }

    
    const exist=await Admin.findOne({
        $or:[{email},{username}]
    })
    console.log(exist);
    if(exist){
        throw new ApiError(400,"Account already exists!");
    }

    
    const admin=await User.create({
        name,
        username,
        password,
        email
    });

    const check=await Admin.findById(admin._id).select("-password -refreshToken");

    if(!check){
        throw new ApiError(500,"Not Registered!");
    }

    
    return res.status(201).json(
       new ApiResponse(201,check,"Reg. success!")
    )
});

const LoginAdmin=asyncHandler(async(req,res)=>{
    
    const {username,password,email}=req.body
 

    if(!username || !password || !email){
     console.log(req.body);
     throw new ApiError(401,"Pls fill all fields!");
    }
 
    
    const exist=await Admin.findOne({
     $or:[{username},{email}]
    })
 
    if(!exist){
     throw new ApiError(500,"No accounts exists with these details, please register first!");
    }
    
 
    const check=await exist.isPasswordTrue(password);
    if(!check){
      throw new ApiError(409,"Incorrect password!");
    }
 
    const {accessToken,refreshToken}=await generateAccessAndRefreshTokens(exist._id);
    console.log(exist._id);
    console.log("accessToken",accessToken);
     console.log("refreshToken",refreshToken);
 
    const loggedDetail=await Admin.findById(exist._id).select("-password -referenceToken")
 
    const options={
       httpOnly:true,
       secure:true
    }
 
    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(200,loggedDetail,"LogIn Success!"))
 });

 export {LoginAdmin,registerAdmin};