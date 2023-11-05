const express=require('express');
const router=express.Router();

const homeController=require('../controllers/homeController')

router.get('/', (req, res, next)=>{console.log('/', req.isAuthenticated()); next();}, homeController.home);
// router.post('/', (req, res, next)=>{console.log('/'); next();}, homeController.home);

module.exports=router;