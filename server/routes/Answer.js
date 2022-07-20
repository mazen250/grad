import mongoose from 'mongoose';
import AnswerModel from '../database/models/Answer.js';
import express from 'express';
import Answer from '../database/models/Answer.js';

let router = express.Router();

router.route("/answers").get(async (req,res)=>{
    let answers = await Answer.find();
    res.send(answers);
})
router.route("/dislike/:id").post(async (req,res)=>{
    let answerId = req.params.id;
    let answer = await Answer.findById(answerId);
    if(answer){
        answer.score = answer.score - 1;
        await answer.save();
        res.send(answer);
    }else{
        res.send("answer not found");
    }
})



//get answers for a question by question id
router.get("/singleQuestionAnswers/:id",async (req,res)=>{
    let questionId = req.params.id;
    let answers = await Answer.find({question_id: questionId});
    if(answers.length > 0){
        res.send(answers);
    }
    else{
        res.send("No answers found");
    }
})

//edit answer
router.route("/edit/:id").post(async (req,res)=>{
    let answerId = req.params.id;
    let newTitle = req.body.title;
    let answer = await Answer.findById(answerId);
    if(answer){
        answer.title =newTitle;
        await answer.save();
        res.send(answer);
    }else{
        res.send("answer not found");
    }
})

//delete answer
router.route("/delete/:id").post(async (req,res)=>{
    let answerId = req.params.id;
    let answer = await Answer.findById(answerId);
    if(answer){
        await answer.remove();
        res.send("answer deleted");
    }else{
        res.send("answer not found");
    }
})



export default router;
