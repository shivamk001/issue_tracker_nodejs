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
    labels:[{type: mongoose.Schema.Types.ObjectId, ref:'Label', default: '65408c94c6ff3bd2dd395586'}],
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
})

// IssueSchema.set('toJSON', {virtuals: true})
// IssueSchema.set('toObject', {virtuals: true})
IssueSchema.virtual('comments',{
    ref: 'Comment',
    localField: '_id',
    foreignField: 'issue'
})

const Issue=mongoose.model('Issue', IssueSchema);

module.exports=Issue