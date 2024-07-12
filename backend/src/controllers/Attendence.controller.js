import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse";
import { User } from "../models/user.model.js";
import { Attendence } from "../models/Attendence.model.js";
import QRCode from "qrcode";
import cron from "node-cron";

const calculateAttend=async()=>{
   try {
      
      // const userid=req.user;
      const attend=await Attendence.find({});

      attend.forEach(async(element) => {
         element.availableDue=(element.Attend.length*60);
         element.status=false
         await element.save();
      })

      // const arr=attend.Attend;

      // const calculation=(60*(arr.length));

      // return calculation;
      
   } catch (error) {
      console.log(error);
      throw new ApiError(501,"internal server error");
   }
}

// const AttendCalc=asyncHandler(async(req,res)=>{
//    try{
//     const value=calculateAttend();

//     res.status(201).json(
//       new ApiResponse(201,value,"value send successfully")
//     )
//    }catch(err){
//       console.log(err);
//       throw new ApiError(501,"internal servaer error");
//    }

// })

cron.schedule('59 23 L * *',calculateAttend);

const GenerateQr=asyncHandler(async(req,res)=>{
     const userid=req.user

     const user=await User.find(userid._id);
     const username=user.username;
      QRCode.toFile('attendence-qrcode.png',username,function(err){
        if(err) throw err;
        console.log('QR code is generated and can be used it for attendence');
      })
})

const ReadQrCode=asyncHandler(async(req,res)=>{
    try{
      const {response}=req.body;
      const userid=req.user._id
      if(!response){
        throw new ApiError("scanning is not completed");
      }

      const findAttend=await Attendence.find(userid);
      if(!findAttend){
         findAttend=await Attendence.create({
            username:userid,
            Attend:[]
         })
      }
      const AttDate=new Date();
      const AttendDate=AttDate.toDateString();

      const updateAtten=await Attendence.findByIdAndUpdate(userid,{
         $addToSet:{Attend:AttendDate}
      },{
        new:true
     })

     res.status(201).json(
        new ApiResponse(201,updateAtten,"Your Mess Attendence is registered for today")
     )
    }catch(err){
        console.log(err);
        throw new ApiError("error in registering the attendence")
    }
});

export {GenerateQr,ReadQrCode};
