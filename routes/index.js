const express=require('express')
const router=express.Router()


router.use((req, res, next)=>{
    console.log("first:", req.url, req.method);
    next();
})
router.use('/', (req, res, next)=>{console.log('/'); next();}, require('./home'));
router.use('/project', (req, res, next)=>{console.log('/project'); next();}, require('./project'));
router.use('/issue', (req, res, next)=>{console.log('/issue'); next();}, require('./issue'));
router.use('/user', (req, res, next)=>{console.log('/user'); next();}, require('./user'));
router.use('/label', (req, res, next)=>{console.log('/label'); next();}, require('./label'));

module.exports=router