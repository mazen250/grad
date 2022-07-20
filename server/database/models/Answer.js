import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const answerSchema = new Schema({
    title:{
        type: String
    },
    account_id:{
        type: String

    },
    question_id:{
        type: String,
        default: "0"
    },
    score:{
        type: Number,
        default: 0
    },user_id:{
        type: String,
        default: ""
    },
    is_accepted:{
        type: String,
        default: "false"
    }
})

const AnswerModel = mongoose.model('answers', answerSchema);
export default AnswerModel;