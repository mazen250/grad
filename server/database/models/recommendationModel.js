import mongoose from "mongoose";
const Schema = mongoose.Schema;

const recommendationSchema = new Schema({
    userId: {
        type: String,
    }
    ,skills:{
        type: String,
        default: "",
    },
    message:{
        type: String,
        default: "We recommend you to learn this skill ",
    }
})
const recommendationModel = mongoose.model("recommendation", recommendationSchema);
export default recommendationModel;