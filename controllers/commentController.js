const mongoose=require('mongoose');
const Comment=require('../models/comment');

//CREATE COMMENT
module.exports.createComment= async (req, res, next)=>{
    try{
        let {comment, issue, project}=req.body;
        //console.log('Auther in createComment:', req.user, comment, issue);
        let author=req.user.id;

        if(comment.length>200){
            throw new Error("User Error: Comment length must be less than 200 characters.");
        }

        let newComment=await Comment.create({comment, issue, author})
        req.flash('success', 'Comment created!')
        return res.redirect(`/project/page/${project}`)
    }
    catch(err){
        console.log('Error in creating comment:', err)
        next(err);
    }
}

//DELETE COMMENT
module.exports.deleteComment=async (req, res, next)=>{
    try{
        let {id}=req.body;
        //console.log('Comment in createComment:', id);
        
        let deletedComment=await Comment.findByIdAndDelete({_id: new mongoose.Types.ObjectId(id)})
        //console.log('DeletedComment:', deletedComment)
        return res.status(200).json(deletedComment)
    }
    catch(err){
        console.log('Error in creating comment:', err)
        next(err);
    }
}

//EDIT COMMENT
module.exports.editComment=async (req, res, next)=>{
    try{
        let {id, projectId, comment}=req.body
        //console.log('Edit Comment:', req.body)
        let _id=new mongoose.Types.ObjectId(id);
        let updatedComment=await Comment.findByIdAndUpdate(_id,{comment: comment}, {returnDocument: 'after', })
        req.flash('success', 'Comment Edited!')
        return res.redirect(`/project/page/${projectId}`)
    }
    catch(err){
        next(err)
    }
}

//GET COMMENTS OF LOGGEDIN USER
module.exports.getUserComments=async (req, res, next)=>{
    try{
        let id=req.user.id
        //console.log('UserId in comments:', id)
        const allComments=await Comment.find({author: id})
        .populate('author', 'username -_id')
        .populate({path: 'issue', select: 'title -_id'})
        .populate({path: 'issue', populate: {path:'project', select: 'name -_id'}})
        //console.log('AllComments:', allComments)

        //return res.status(201).json(allComments)
        return res.render('allMyComments', {allComments: allComments, page: 'userComments', author: req.user})
    }
    catch(err){
        console.log('Error in getUserComments:', err)
        next(err)
    }
}