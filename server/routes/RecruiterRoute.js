import express, { Router } from 'express';
import RecruiterModel from '../database/models/RecruiterModel.js';
import JobModel from '../database/models/JobModel.js';
import recruiterModel2 from '../database/models/RecruiterNew.js'
let router = express.Router();
router.route("/register").post((req, res) => {
    // let name = req.body.name;
    // let CompanyName = req.body.CompanyName;
    // let password = req.body.password;
    // console.log(name, CompanyName, password);
    // let newRecruiter = new RecruiterModel({
    //     name: name,
    //     CompanyName: CompanyName,
    //     password: password
    // })
    // newRecruiter.save();
    // console.log(newRecruiter);
    // res.send(newRecruiter);
    let recruiterName = req.body.recruiterName;
    let password = req.body.password;
    let CompanyName = req.body.CompanyName;
    console.log(recruiterName, password, CompanyName);
    let newRecruiter = new recruiterModel2({
        recruiterName: recruiterName,
        password: password,
        CompanyName: CompanyName

    })
    newRecruiter.save();
    console.log(newRecruiter);
    res.send(newRecruiter);

})



//login for recruiter
router.route('/login').post((req, res) => {
    let recruiterName = req.body.recruiterName;   
    let password = req.body.password;
    console.log("recruiterName", recruiterName, "password", password);
    recruiterModel2.find({ recruiterName: recruiterName, password: password }, (err, recruiter) => {
        if (err) {
            res.send(err);
        } else {
            res.send(recruiter);
        }
    }
    )
}
)

//add new job 
router.route('/addjob').post((req, res) => {
    let JobTitel = req.body.JobTitel;
    let skills = req.body.skills;
    let recruiterId = req.body.recruiterId;
    let CompanyName = req.body.CompanyName;
    let recruiterName = req.body.recruiterName;
    let password = req.body.password;
    let newJob = new recruiterModel2({
        JobTitel: JobTitel,
        skills: skills,
        recruiterId: recruiterId,
        CompanyName: CompanyName,
        recruiterName: recruiterName,
        password: password
    })
    newJob.save();
    console.log(newJob);
    res.send(newJob);

})

//get recruiter by id
router.route('/getrecruiterbyid').post((req, res) => {
    let recruiterId = req.body.recruiterId;
    console.log("recruiterId", recruiterId);
    recruiterModel2.findById({_id:recruiterId}, (err, recruiter) => {
        if (err) {
            res.send(err);
        } else {
            res.send(recruiter);
        }
    }
    )
})

//get all jobs by recruiter id
router.route('/getalljobsbyrecruiterid').post((req, res) => {
    let recruiterId2 = req.body.recruiterId;
    console.log("recruiterId new", recruiterId2);
    recruiterModel2.find({ recruiterId: recruiterId2 }, (err, jobs) => {
        if (err) {
            res.send(err);
        } else {
            res.send(jobs);
        }
    }
    )
})

// delete job by id
router.route('/deletejobbyid').post((req, res) => {
    let jobId = req.body.jobId;
    console.log("jobId", jobId);
    recruiterModel2.findByIdAndDelete({_id:jobId}, (err, job) => {
        if (err) {
            res.send(err);
        } else {
            res.send(job);
        }
    }
    )
})


//get job by id
router.route('/getjobbyid').post((req, res) => {
    let jobId = req.body.jobId;
    console.log("jobId", jobId);
    recruiterModel2.findById({_id:jobId}, (err, job) => {
        if (err) {
            res.send(err);
        } else {
            res.send(job);
        }
    }
    )
})


// get all job for recruiter with recruiterId









//get recruiter by id
// router.route('/:id').get((req, res) => {
//     console.log("id", req.params.id);
//     let id = req.params.id;
//     recruiterModel2.findById(id, (err, recruiter) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send(recruiter);
//         }
//     }
//     )
// })


// //create job
// router.route('/:id/addJob').post((req, res) => {
//     let id = req.params.id;
//     let JobTitle = req.body.JobTitle;
//     let CompanyName = req.body.CompanyName;
//     let skills = req.body.skills;
//     let recruiterName = req.body.recruiterName;
//     let newJob = new JobModel({
//         JobTitle: JobTitle,
//         CompanyName: CompanyName,
//         skills: skills,
//         recruiterId: id,
//         recruiterName: recruiterName
//     })
//     newJob.save();
//     console.log(newJob);
//     res.send(newJob);
// })


// //get all jobs with recruiter id
// router.route('/:id/jobs').get((req, res) => {
//     let id = req.params.id;
//     JobModel.find({ recruiterId: id }, (err, jobs) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send(jobs);
//         }
//     }
//     )
// })

// //delete job by id
// router.route('/deleteJob/:jobId').delete((req, res) => {
   
//     let jobId = req.params.jobId;
//     JobModel.findByIdAndDelete(jobId, (err, job) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send(job);
//         }
//     }
//     )

// })

export default router;