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

router.get('/all', (req, res, next)=>{console.log('/project/all'); next();}, projectController.getAllProjects)

router.get('/page/:id', projectController.showProjectPage)

router.post('/page/:id', projectController.showProjectPage)

router.get('/userProjects/:id', (req, res, next)=>{
    console.log(req.params)
    //return res.render('home', {title: 'IssueTrackerHome', projects});
    // return res.send('POST request received')
    next()
}, projectController.getUserProjects)

router.post('/delete/:id', projectController.deleteProject)

module.exports=router