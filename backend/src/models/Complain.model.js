import mongoose, { Schema } from "mongoose"

const ComplainSchema=new mongoose.Schema({
    ComplainApplied:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    RoomNo:{
      type:String
    },
    DateOfComplain:{
       type:Date,
       required:true,
    },
    Description:{
        type:String
    },
    image:[{
        type:String,
        required:true
    }]
    
},{timestamps:true})

export const Complain=mongoose.model('Complain',ComplainSchema);