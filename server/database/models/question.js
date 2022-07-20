import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const questionSchema = new Schema({
    tags: {
        type: Array,
        default: []
    },
    owner:{
        type: Object,
        // required: true
    },
    is_answered: {
        type: String,
        default: "false"
    }
    ,answer_count: {
        type: Number,
        default: 0
    },
    score: {
        type: Number,
        default: 0
    },
    last_activity_date: {
        type: Number,
    },
    creation_date: {
        type: Number,
    },
    question_id: {
        type: Number,
        unique: true,
    },
    link: {
        type: String,

    },
    title: {
        type: String,
    },
    account_id: {
        type: String,
        
    }
})

const Question = mongoose.model('questions', questionSchema);
export default Question;