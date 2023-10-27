const mongoose=require('mongoose');

const IssueSchema=new mongoose.Schema({
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Issue'
    },
    title:{
        type: String,
        maxLength: 200,
        required: true
    },
    description:{
        type: String,
        maxLength: 500
    },
    status:{
        type: String,
        enum:['pending', 'resolved', 'inprogress', 'onhold'],
        default:"inprogress",
        required:"true"
    },
    labels:[String],
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
})

const Issue=mongoose.model('Issue', IssueSchema);

module.exports=Issue