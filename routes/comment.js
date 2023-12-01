const express=require('express');
const router=express.Router();

const commentController=require('../controllers/commentController')

//CREATE COMMENT ROUTE
router.post('/create', commentController.createComment)

//EDIT COMMENT ROUTE
router.post('/edit', commentController.editComment)

//DELETE COMMENT ROUTE
router.delete('/delete', commentController.deleteComment)

//GET ALL USER COMMENT ROUTES
router.get('/userComments', commentController.getUserComments)

module.exports=router