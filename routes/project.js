const express=require('express')
const router=express.Router()

const projectController=require('../controllers/projectController')

router.post('/create', (req, res, next)=>{
    console.log(req.body)
    //return res.render('home', {title: 'IssueTrackerHome', projects});
    // return res.send('POST request received')
    next()
}, projectController.createProject)

router.get('/create', projectController.renderCreateProject)

router.get('/all', projectController.getAllProjects)

module.exports=router