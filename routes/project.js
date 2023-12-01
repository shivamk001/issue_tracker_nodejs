const express=require('express')
const router=express.Router()

const isAuthenticated=require('../utilities/isAuthenticated')

const projectController=require('../controllers/projectController')

//ROUTE TO DISPLAY ALL PROJECTS IN HOMEPAGE
router.get('/all', projectController.getAllProjects)

//ALLOW BELOW ROUTES FOR AUTHENTICATED USER
router.use(isAuthenticated)
//CREATE PROJECT ROUTE
router.post('/create', projectController.createProject)
router.get('/create', projectController.renderCreateProject)
//SHOW PROJECT WITH ID IN PARAMS ROUTE
router.get('/page/:id', projectController.showProjectPage)
router.post('/page/:id', projectController.showProjectPage)
//ROUTE TO GET ALL PROJECTS WITH USERID MENTIONED IN PARAMS
router.get('/userProjects/:id', projectController.getUserProjects)
//ROUTE TO DELETE PROJECT WITH ID IN PARAMS
router.post('/delete/:id', projectController.deleteProject)

module.exports=router