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
        maxLength: 1000
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    }, 
    issues:[{type: mongoose.Schema.Types.ObjectId,ref:'Issue'}]
},{
    timestamps: true,
    strictPopulate: false,
    // methods:{},
    // statics:{},
    // query:{},
    virtuals:{
        id:{
            get(){
                return this._id.toString()
            }
        }
    }
})

const Project=mongoose.model('Project', ProjectSchema);

module.exports=Project;