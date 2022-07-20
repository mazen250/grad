import express from "express";
import questionModal from "../database/models/question.js";
let router = express.Router();

router.route("/questions").get(async (req, res) => {
    console.log("get all questions");
    
    let questions = await questionModal.find().limit(500);
    
    try {
        res.send(questions);
    }
    catch (err) {
        res.send(err);
    }
})

// get all question with a specific user id
router.route("/userQuestions/:id").get(async (req, res) => {
    let id = req.params.id;
    
    questionModal.find({account_id:id},function(err,questions){
        if(err){
            res.send("error")
        }
        else{
            res.send(questions)
        }
    })

})

// get all question with a specific user _id
router.route("/userQuestionsByUserId/:id").get(async (req, res) => {
    let id = req.params.id;
    let userQuestionss = await questionModal.findById(id);
    if(userQuestionss){
        //let questions = await questionModal.find({account_id:userQuestions.account_id});
        res.send(userQuestionss);
    }
    else{
        res.send("user not have questions")
    }

})


//get question by id
router.route("/singlequestion/:id").get(async (req, res) => {
    let id = req.params.id;
    let question = await questionModal.findById(id);
    if(question){
        res.send(question);
    }
    else{
        res.send("question not found")
    }
}
)

//add question
router.route("/addQuestion").post(async (req, res) => {
    let title = req.body.question;
    let account_id = req.body.account_id;
    let tags = req.body.tags; 
    //question_id is random number
    let question_id =  function() {
        return Math.floor(Math.random() * 100000000)
      }
    let question = new questionModal({
        title: title,
        account_id: account_id,
        tags: tags,
        question_id: question_id()

    })
    
    question.save()
    res.send("question added succefully")

    
})


//add score to question
router.route("/addScore/:id").post(async (req, res) => {
    let id = req.params.id;
    //find question by id
    let question = await questionModal.findById(id);
    if(question){
        //add score to question
        question.score = question.score + 1;
        //save question
        question.save();
        res.send("question score added succefully")
    }
    else{
        res.send("question not found")
    }
    
})

//get question by account_id
router.route("/questionByAccountId/:id").get(async (req, res) => {
    let id = req.params.id;
    let question = await questionModal.find({account_id:id});
    if(question){
        res.send(question);
    }
    else{
        res.send("question not found")
    }
})



//get question that have a specific account_id
export default router;