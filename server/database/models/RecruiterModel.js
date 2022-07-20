import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const recruiterSchema = new Schema({
    name:{
        type: String,

    }
    ,
    CompanyName:{
        type: String,

    },
    password:{
        type: String,
    },
    
})

    const Recruiter = mongoose.model('recruitersss', recruiterSchema);
    export default Recruiter;