import { Complain } from "../models/Complain.model";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";

const CreateComplain=asyncHandler(async(req,res)=>{
   try{
     const {roomNo,Description}=req.body;
     const userid=req.user;
     const files=req.files;
     if(!roomNo || !Description){
        throw new ApiError("please fill all the information");
     }
     const imageUp=await Promise.all(files.map(file=>uploadOnCloudinary(file.path)));
     const mediaUrl=imageUp.map(file=>file.secure_url);
     const userGet=await User.find(userid._id);
     const currDate=new Date();
     const theDate=currDate.toDateString();
     const complain=await Complain.create({
        ComplainApplied:userid._id,
        RoomNo:roomNo,
        DateOfComplain:theDate,
        Description,
        image:mediaUrl
     })
     await complain.save();

     res.status(201).json(
      new ApiResponse(201,complain,"complain registered successfully")
     )
   }catch(err){
        throw new ApiError("there is error in registering the complain, try again later")
   }
});

const getComplain=asyncHandler(async(req,res)=>{
   try{
   const complain=await Complain.find();

   res.status(201).json(
      new ApiResponse(201,complain,"complain fetched successfully")
   )
   }catch(err){
      throw new ApiError("error in getting the product");
   }
})

export {CreateComplain,getComplain}