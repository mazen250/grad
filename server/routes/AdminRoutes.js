import express from "express";
import Admin from "../database/models/AdminModel.js";
let router = express.Router();
import Competition from "../database/models/Competition.js";

router.route("/adminLogin").post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    // find the user
    Admin.findOne({ username: username, password: password }, (err, user) => {
        if (err) {
            res.send("error");
            console.log("error");
        } else {
            if (user) {
                console.log(user)
                res.send(user);
            } else {
                res.send("not found");
            }
        }
    });
})

router.route("/addAdmin").post((req, res) => {
    
    let name = req.body.name;
    let password = req.body.password;
    let newAdmin = new Admin({
        name: name,
        password: password

    })
    newAdmin.save();
    res.send(newAdmin);
})

// add new competition
router.route("/addCompetition").post((req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let start_date = Date.now();
    let questionOne = req.body.questionOne;
    let questionTwo = req.body.questionTwo;
    let questionThree = req.body.questionThree;
    let questionFour = req.body.questionFour;
    let answerOne = req.body.answerOne;
    let answerTwo = req.body.answerTwo;
    let answerThree = req.body.answerThree;
    let answerFour = req.body.answerFour;
    let questionOneOptions = req.body.questionOneOptions;
    let questionTwoOptions = req.body.questionTwoOptions;
    let questionThreeOptions = req.body.questionThreeOptions;
    let questionFourOptions = req.body.questionFourOptions;
    let newCompetition = new Competition({
        title: title,
        description: description,
        start_date: start_date,
        questionOne: questionOne,
        questionTwo: questionTwo,
        questionThree: questionThree,
        questionFour: questionFour,
        answerOne: answerOne,
        answerTwo: answerTwo,
        answerThree: answerThree,
        answerFour: answerFour,
        questionOneOptions: questionOneOptions,
        questionTwoOptions: questionTwoOptions,
        questionThreeOptions: questionThreeOptions,
        questionFourOptions: questionFourOptions
    })
    newCompetition.save();
    res.send(newCompetition);
    
})
export default router;