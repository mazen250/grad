import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const userSchema = new Schema({

    display_name: {
        type: String,
        // required: true
    }
    ,
    email: {
        type: String,
        // required: true
    },
    password: {
        type: String,
        // required: true
    },
    is_employee: {
        type: String,
        default: "FALSE"
    },
    view_count: {
        type: Number,
        default: 0
    },
    down_vote_count: {
        type: Number,
        default: 0
    },
    up_vote_count: {
        type: Number,
        default: 0
    },
    answer_count: {
        type: Number,
        default: 0
    }
    ,
    question_count: {
        type: Number,
        default: 0
    },
    
    user_id: {
        type: Number
        // defualt will be the same as _id of the user
    }
    ,
    location: {
        type: String,
        default: ""
    }
    ,
    skills: {
        type: Array,
        default: []
    },
    account_id: {
        type: String,
        //defualt will be random 9 digit number
       
        
        default : function() {
            return Math.floor(Math.random() * 100000000)
          }
    }
    ,
    profile_image:{
        type: String,
        default: ""
    },age:{
        type: Number,
        default: 0
    }   
    ,badge_counts: {
        type: Object,
        default: {
            gold: 0,
            silver: 0,
            bronze: 0
        }}

    ,Gold:{
        type: Number,
        default: 0
    },
    Silver:{
        type: Number,
        default: 0
    },
    Bronze:{
        type: Number,
        default: 0
    },
    points:{
        type: Number,
        default: 0
    }


})

const User = mongoose.model('usersData', userSchema);
export default User;