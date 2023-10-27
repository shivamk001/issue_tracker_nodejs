const express=require('express');
const router=express.Router();

const issueController=require('../controllers/issueController');

router.post('/create', (req, res, next)=>{
    console.log(req.body)
    //return res.render('home', {title: 'IssueTrackerHome', projects});
    // return res.send('POST request received')
    next()
}, issueController.createIssue);

module.exports=router