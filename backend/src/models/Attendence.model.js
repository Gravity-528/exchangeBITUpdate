import mongoose from "mongoose";

const AttendenceSchema=new mongoose.Schema({
    username:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    Attend:[{
        type:String,
        required:true
    }],
    availableDue:{
        type:Number,
        required:true,
        default:0
    },
    status:{
        type:Boolean,
        required:true,
        default:false
    }
    
},{timeStamps:true});

export const Attendence=new mongoose.model('Attendence',AttendenceSchema);