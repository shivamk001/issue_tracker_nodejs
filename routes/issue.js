const express=require('express');
const router=express.Router();

const isAuthenticated=require('../utilities/isAuthenticated')
const issueController=require('../controllers/issueController');

(req, res, next)=>{
    console.log(req.params)
    next()
}
//ALLOW ONLY AUTHENTICATED USER
router.use(isAuthenticated)
//CREATE USER ROUTE
router.post('/create', issueController.createIssue);
//GET USER ISSUES ROUTE
router.get('/userIssues/:id', issueController.getUserIssues)
//DELETE ISSUE ROUTE
router.delete('/delete', issueController.deleteIssue)

//router.post('/')

module.exports=router