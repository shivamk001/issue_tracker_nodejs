const express=require('express');
const router=express.Router();

const isAuthenticated=require('../utilities/isAuthenticated')
const issueController=require('../controllers/issueController');

(req, res, next)=>{
    console.log(req.params)
    next()
}

router.use(isAuthenticated)
router.post('/create', (req, res, next)=>{
    console.log(req.body)
    next()
}, issueController.createIssue);
router.get('/userIssues/:id', (req, res, next)=>{
    console.log(req.params)
    next()
}, issueController.getUserIssues)
router.delete('/delete', issueController.deleteIssue)

router.post('/')

module.exports=router