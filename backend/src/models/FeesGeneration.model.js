import mongoose, { Schema } from "mongoose"

const FeeSchema=new mongoose.Schema({
    name:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    availableDue:{
        type:Number,
        required:true
    },
    status:{
        type:Boolean
    }
},{timestamps:true});

export const Fees=mongoose.model('Fees',FeeSchema);