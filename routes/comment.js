const express=require('express');
const router=express.Router();

const commentController=require('../controllers/commentController')

router.post('/create', commentController.createComment)

router.post('/edit', commentController.editComment)

router.delete('/delete', commentController.deleteComment)

router.get('/userComments', commentController.getUserComments)

module.exports=router