const mongoose=require('mongoose');

const IssueSchema=new mongoose.Schema({
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Issue'
    },
    description:{
        type: String,
        maxLength: 500
    },
    status:{
        type: String,
        enum:['pending', 'resolved', 'inprogress', 'onhold']
    }
},{
    timestamps: true
})

const Issue=mongoose.Model('Issue', IssueSchema);

module.exports=Issue