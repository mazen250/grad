import express from "express";
import UserModal from "../database/models/UserModal.js";
import competitionModal from "../database/models/Competition.js";
import recommendationModel from "../database/models/recommendationModel.js";
import Notification from "../database/models/Notification.js";
let router = express.Router();
router.route("/register").post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let nationality = req.body.nationality;
    let skills = req.body.skills
    // create a new user 
    if(username == "" || password =="" || email==""){
        console.log("not complete");
        res.send("not complete")
    }else{

        try{
            const newUser = new UserModal({
                display_name:username,
                password:password,
                email:email,
                location:nationality,
                skills:skills
        
            })
            
            newUser.save()
            
            res.send(newUser)
         
        }
        catch(e){
            res.send("error happend")
    
    
        }
    }
    
})

router.route("addId/:id").post((req,res)=>{
    let id = req.params.id;
    //account_id is random number
    const user = UserModal.findOne({_id:id})
    if(user){
        if(user.account_id == null){
            const newaccount_id = Math.floor(Math.random() * 1000000);
            //update the account_id
            UserModal.updateOne({_id:id},{account_id:newaccount_id})
            res.send(newaccount_id)
            
        }
        else{
            res.send("account id already exists")
        }
    }

})


router.route("/login").post((req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    // login a user
    if(email == "" || password ==""){
        console.log("not complete");
        res.send("not complete")
    }
    else{
        UserModal.findOne({email:email,password:password},(err,user)=>{
            if(err){
                res.send("error")
            }
            else if(user){
                console.log(user);
                res.send(user)

            }
            else{
                //try to login with display_name and user_id
                UserModal.findOne({display_name:email,account_id:password},(err,user)=>{
                    if(err){
                        res.send("error")
                    }
                    else if(user){
                        console.log(user);
                        res.send(user)

                    }
                    else{
                        res.send("user not found")
                    }
                }
                )
            }
        }
        )
    }
})

//get user by id
router.route("/:id").get((req, res) => {
    let id = req.params.id;
    console.log("user id is: " + id);
    UserModal.findOne({_id:id},(err,user)=>{
        if(err){
            res.send("error")
        }
        else if(user){
            console.log(user);
            res.send(user)

        }
        else{
            res.send("user not found")
        }
    }
    )
})

router.route("/singleUser/:id").get(async (req, res) => {
    
    let id = req.params.id;
   UserModal.find({account_id:id},function (err,user){
         if(err){
              res.send("error")
         }
         else{
              res.send(user)
         }
   })
})
router.route("/singleUser2/:id").get(async (req, res) => {
    
    let id = req.params.id;
   UserModal.find({user_id:id},function (err,user){
         if(err){
              res.send("error")
         }
         else{
              res.send(user)
         }
   })
})

//login with id and password

//get all users 
router.route("/users").get(async (req, res) => {
    let users = await UserModal.find();
    try {
        res.send(users);
    }
    catch (err) {
        res.send(err);
    }
}
)


// add point to user with account_id
router.route("/addPoint/:id").post(async (req, res) => {
    console.log("adding point");
    let id = req.params.id;
    let AnswerOwner = req.body.AnswerOwner;
    let question_id = req.body.question_id;
    UserModal.find({account_id:id},function (err,user){
        if(err){
            res.send("error")
        }
        else if(user){
           let newNotification = new Notification({
                user_id:user[0]._id,
                body:"You have received a point from asnwering question with id: " + question_id,
           })
              newNotification.save()
            

            // let points = user[0].points;
            user[0].points = user[0].points+5;

            if(user[0].points >= 30){
                user[0].Gold = user[0].Gold+1;
                user[0].points = 0;
                user[0].save();
                let newNotification = new Notification({
                    user_id:user[0]._id,
                    body:"Congrats! you got a new Gold badge,Keep the great work",
               })
                  newNotification.save()
                res.send(user)
            }
            else if(user[0].points >= 20){
                
                if(user[0].Silver<=user[0].Gold){
                 user[0].Silver = user[0].Silver +1;
                 user[0].save();
                 let newNotification = new Notification({
                    user_id:user[0]._id,
                    body:"Congrats! you got a new Silver badge,Keep the great work",
               })
                  newNotification.save()
                    res.send(user)
                }else{
                    user[0].save();
                res.send(user)
                }

            }
            else if(user[0].points >= 10){
                if(user[0].Bronze<=user[0].Silver){
                    user[0].Bronze = user[0].Bronze +1;
                    user[0].save();
                    let newNotification = new Notification({
                        user_id:user[0]._id,
                        body:"Congrats! you got a new Bronze badge,Keep the great work",
                   })
                      newNotification.save()
                    res.send(user)
                    
                }
                else{
                    user[0].save();
                    res.send(user)    
                }
            }
            else{
                user[0].save();
                res.send(user)
            }
            
            
           
        }
        else{
            res.send("user not found")
        }
    });
  
})



router.route("/grade").post((req, res) => {
    
    let id = req.body.id;
    let grade = req.body.grade;
    let competitionId = req.body.competitionId;
  
    UserModal.find({account_id:id},function (err,user){
        if(err){
            res.send("error")
        }
        else if(user){
           
            

            // let points = user[0].points;
            user[0].points = user[0].points+grade;

            if(user[0].points >= 30){
                user[0].Gold = user[0].Gold+1;
                user[0].points = 0;
                competitionModal.find({_id:competitionId},function (err,competition){
                    if(err){
                        res.send("error")
                    }
                    else if(competition){
                        console.log(competition[0].attendants);
                        competition[0].attendants.push(id);
                        competition[0].save();

                        console.log(competition[0].attendants);
                    }
                })
                let newNotification = new Notification({
                    user_id:user[0]._id,
                    body:"Congrats! you got a new Gold badge from the competition, Keep the great work",
               })
                  newNotification.save()
                user[0].save();
                res.send(user)
            }
            else if(user[0].points >= 20){
                
                if(user[0].Silver<=user[0].Gold){
                 user[0].Silver = user[0].Silver +1;
                 competitionModal.find({_id:competitionId},function (err,competition){
                    if(err){
                        res.send("error")
                    }
                    else if(competition){
                        console.log(competition[0].attendants);
                        competition[0].attendants.push(id);
                        competition[0].save();
                        console.log(competition[0].attendants);
                    }
                })
                let newNotification = new Notification({
                    user_id:user[0]._id,
                    body:"Congrats! you got a new Silver badge from the competition,Keep the great work",
               })
                  newNotification.save()
                 user[0].save();
                    res.send(user)
                }else{
                    competitionModal.find({_id:competitionId},function (err,competition){
                        if(err){
                            res.send("error")
                        }
                        else if(competition){
                            console.log(competition[0].attendants);
                            competition[0].attendants.push(id);
                            competition[0].save();
                            console.log(competition[0].attendants);
                        }
                    })
                    user[0].save();
                res.send(user)
                }

            }
            else if(user[0].points >= 10){
                if(user[0].Bronze<=user[0].Silver){
                    user[0].Bronze = user[0].Bronze +1;
                    competitionModal.find({_id:competitionId},function (err,competition){
                        if(err){
                            res.send("error")
                        }
                        else if(competition){
                            console.log(competition[0].attendants);
                            competition[0].attendants.push(id);
                            competition[0].save();
                            console.log(competition[0].attendants);

                        }
                    })
                    let newNotification = new Notification({
                        user_id:user[0]._id,
                        body:"Congrats! you got a new Bronze badge from the competition,Keep the great work",
                   })
                      newNotification.save()
                    user[0].save();
                    res.send(user)
                }
                else{
                    competitionModal.find({_id:competitionId},function (err,competition){
                        if(err){
                            res.send("error")
                        }
                        else if(competition){
                            console.log(competition[0].attendants);
                            competition[0].attendants.push(id);
                            competition[0].save();
                            console.log(competition[0].attendants);
                        }
                    })
                    user[0].save();
                    res.send(user)    
                }
            }
            else{
                competitionModal.find({_id:competitionId},function (err,competition){
                    if(err){
                        res.send("error")
                    }
                    else if(competition){
                        console.log(competition[0].attendants);
                        competition[0].attendants.push(id);
                        competition[0].save();
                        console.log(competition[0].attendants);
                    }
                })
                user[0].save();
                res.send(user)
            }
            
            
           
        }
        else{
            res.send("user not found")
        }
    });
  
})

//get notifications for user with user_id

router.route("/getNotifications/:id").get((req, res) => {
    let id = req.params.id;
    console.log(id);
    UserModal.find({_id:id},function (err,user){
        if(err){
            res.send("error")
        }
        else if(user){
            recommendationModel.find({user_id:id},function (err,recommendations){
                if(err){
                    res.send("error")
                }
                else if(recommendations){
                    res.send(recommendations)
                }
            })
        }
        else{
            res.send("user not found")
        }
    });
})

//get notification with user_id in notification model with _id in user model
router.route("/getNotification/:id").get((req, res) => {
    let id = req.params.id;
    console.log(id);
    Notification.find({user_id:id},function(err,notification){
        if(err){
            res.send("error")
        }
        else if(notification){
            res.send(notification)
        }
        else{
            res.send("no notification for this user")
        }
    })

})


export default router;
