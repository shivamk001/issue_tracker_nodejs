const express=require('express');
const router=express.Router();

const labelController=require('../controllers/labelController');

router.post('/create', (req, res, next)=>{
    console.log(req.body)
    //return res.render('home', {title: 'IssueTrackerHome', projects});
    // return res.send('POST request received')
    next()
}, labelController.createLabel);

module.exports=router;