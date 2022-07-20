import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import QuestionRoute from './routes/QuestionRoute.js';
import UserRoutes from './routes/User.js';
import AnswerRoutes from './routes/Answer.js';
import AnswerModel from '../server/database/models/Answer.js';
import AdminRoutes from './routes/AdminRoutes.js';
import RecruiterModel from './database/models/RecruiterModel.js';
import Competition from './database/models/Competition.js';
import RecruiterRoute from './routes/RecruiterRoute.js';
import recommendationModel from './database/models/recommendationModel.js';
import Notification from './database/models/Notification.js';
const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://Mazen:Mazen1234@cluster0.gobr9.mongodb.net/Graduation?retryWrites=true&w=majority', { useNewUrlParser: true });

mongoose.connection.on('connected', () => {
    console.log('connected to mongo ');
})

app.use('/question', QuestionRoute)
app.use('/user', UserRoutes)
app.use('/answer', AnswerRoutes)
app.use('/admin', AdminRoutes)
app.use("/recruiter", RecruiterRoute)


//add answer to question with question id 
 app.post('/addanswer', async (req, res) => {
    console.log("add answer");
    let question_id = req.body.question_id;
    let title = req.body.title;
    let account_id = req.body.account_id;
    let user_id = req.body.user_id;
    let questionOwner = req.body.questionOwner;
    let newAnswer = new AnswerModel({
        title: title,
        account_id: account_id,
      
        question_id:question_id,
        user_id: user_id
    })
    await newAnswer.save();
    let newNotification = new Notification({
        user_id: questionOwner,
        body: "You have a new answer on question " + question_id,

    })
    await newNotification.save();
    // console.log(newAnswer);
    res.send(newAnswer);

 })


//get all answers of question with question id
app.get('/getanswers/:question_id', async (req, res) => {
    console.log("get answers");
    let question_id = req.params.question_id;
    AnswerModel.find({question_id: question_id},
        function (err, answers) {
            if(err){
                res.send(err);
            }else{
                res.send(answers);
            }
        });
    
})

app.post("/addScore/:id",async (req,res)=>{
    let answerId = req.params.id;
    let answer = await AnswerModel.findById(answerId);
    if(answer){
        answer.score = answer.score + 1;
        await answer.save();
        res.send(answer);
    }else{
        res.send("answer not found");
    }
})
app.post("/dislike/:id",async (req,res)=>{
    let answerId = req.params.id;
    let answer = await AnswerModel.findById(answerId);
    if(answer){
        answer.score = answer.score - 1;
        await answer.save();
        res.send(answer);
    }else{
        res.send("answer not found");
    }
})


//get competition 
app.get('/getCompetition', async (req, res) => {
    console.log("get competition");
    let competition = await Competition.find();
    if(competition){
        res.send(competition);
    }
    else{
        res.send("competition not found");
    }
})

app.get('/testRec',(req,res)=>{
    recommendationModel.find({},function(err,recommendations){
        if(err){
            res.send(err);
        }else{
            if(recommendations.skills){
                res.send(recommendations);
            }
            res.send("no skills");
        }
    }).limit(10);
})

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.listen(5000,(req,res)=>{
    console.log('server is running on port 5000');
})