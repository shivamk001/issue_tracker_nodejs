const express=require('express');
const router=express.Router();

const issueController=require('../controllers/issueController');

(req, res, next)=>{
    console.log(req.params)
    //return res.render('home', {title: 'IssueTrackerHome', projects});
    // return res.send('POST request received')
    next()
}

router.post('/create', (req, res, next)=>{
    console.log(req.body)
    //return res.render('home', {title: 'IssueTrackerHome', projects});
    // return res.send('POST request received')
    next()
}, issueController.createIssue);

router.get('/userIssues/:id', (req, res, next)=>{
    console.log(req.params)
    //return res.render('home', {title: 'IssueTrackerHome', projects});
    // return res.send('POST request received')
    next()
}, issueController.getUserIssues)

router.delete('/delete', issueController.deleteIssue)

router.post('/')

module.exports=router