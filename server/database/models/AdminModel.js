import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const adminSchema = new Schema({
    name:{
        type: String,

    },role:{
        type: String,
        default:"admin"
    },
    password:{
        type: String,
    }
})

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;