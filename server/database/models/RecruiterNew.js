import mongoose from "mongoose";
const Schema = mongoose.Schema;
const recruiterSChema = new Schema({
    JobTitel:{
        type:String,
        default:"not specified"
    }
    ,
    skills:{
        type:String,
        default:"no skills yet"
    }
    ,recruiterId:{
        type:String,
        default:""
    },
    CompanyName:{
        type:String,
    },
    password:{
        type:String,
    },
    recruiterName:{
        type:String,
    }
})
const RecruiterModel = mongoose.model("RecruiterNew", recruiterSChema);
export default RecruiterModel;