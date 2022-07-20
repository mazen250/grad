import mongoose from "mongoose";
const Schema = mongoose.Schema;
const jobSchema = new Schema({
    JobTitle: {
        type: String,
    },
    CompanyName: {
        type: String,
    },
    skills: {
        type: String,
    }
    ,recruiterId:{
        type: String,
    },
    recruiterName:{
        type: String,
    }
})
const Job = mongoose.model("jobs", jobSchema);
export default Job;
