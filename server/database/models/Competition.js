import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const competitionSchema = new Schema({
    title:{
        type: String,

    },
    decription:{
        type: String,
        default: 'competition description',
    },
    attendants:{
        type:Array,
        default:[]
    },
    start_date:{
        type: Date,
        default: Date.now

    },
   
    status:{
        type: String,
        default:"available"
    },
    questionOne:{
        type: String,
        default:""
    },
    questionTwo:{
        type: String,
        default:""
    }
    , questionThree:{
        type: String,
        default:""
    },
    questionFour:{
        type: String,
        default:""
    },
  answerOne:{
        type: String,
        default:""

    },
    answerTwo:{
        type: String,
        default:""
    },
    answerThree:{
        type: String,
        default:""
    },
    answerFour:{
        type: String,
        default:""
    }
    ,questionOneOptions:{
        type: Array,
        default:[]
    },
    questionTwoOptions:{
        type: Array,
        default:[]
    }
    ,questionThreeOptions:{
        type: Array,
        default:[]
    }
    ,questionFourOptions:{
        type: Array,
        default:[]
    }
    

})
const Competition = mongoose.model('Competition', competitionSchema);
export default Competition;