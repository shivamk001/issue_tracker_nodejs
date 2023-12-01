const mongoose=require('mongoose');

const CommentSchema=new mongoose.Schema({
    comment:{
        type: String,
        required: true,
        maxLength: 200
    },
    issue:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Issue'
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

const Comment=mongoose.model('Comment', CommentSchema);

module.exports=Comment;