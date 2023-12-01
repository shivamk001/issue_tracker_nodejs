const express=require('express');
const router=express.Router();

const labelController=require('../controllers/labelController');

//CREATE LABEL
router.post('/create', labelController.createLabel);

module.exports=router;