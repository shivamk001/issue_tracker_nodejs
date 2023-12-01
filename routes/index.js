const express=require('express')
const router=express.Router()

router.use((req, res, next)=>{
    console.log("first:", req.url, req.method);
    console.log('User in routes:', req.user)
    next();
})

//HOMEPAGE ROUTE
router.use('/', require('./home'));
//PROJECT ROUTE
router.use('/project', require('./project'));
//ISSUE ROUTE
router.use('/issue', require('./issue'));
//USER ROUTE
router.use('/user', require('./user'));
//LABEL ROUTE
router.use('/label', require('./label'));
//COMMENT ROUTE
router.use('/comment', require('./comment'));

module.exports=router