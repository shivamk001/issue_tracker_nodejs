const mongoose=require('mongoose');

const ProjectSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true,
        maxLength: 200
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    }
},{
    timestamps: true,
    strictPopulate: false
    // methods:{},
    // statics:{},
    // query:{},
    // virtuals:{}
})

const Project=mongoose.model('Project', ProjectSchema);

module.exports=Project;