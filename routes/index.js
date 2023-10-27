const express=require('express')
const router=express.Router()

const homeController=require('../controllers/homeController')


router.use((req, res, next)=>{
    console.log("first:", req.url, req.method);
    next();
})
router.get('/', (req, res, next)=>{console.log('/'); next();}, homeController.home)
router.use('/project', (req, res, next)=>{console.log('/project'); next();}, require('./project'));
router.use('/issue', (req, res, next)=>{console.log('/issue'); next();}, require('./issue'));
router.use('/user', (req, res, next)=>{console.log('/user'); next();}, require('./user'));

module.exports=router