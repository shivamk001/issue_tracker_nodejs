const mongoose=require('mongoose');

const IssueSchema=new mongoose.Schema({
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
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
    labels:[{type: mongoose.Schema.Types.ObjectId, ref:'Label'}],
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
})

const Issue=mongoose.model('Issue', IssueSchema);

module.exports=Issue