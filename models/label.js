const mongoose=require('mongoose');

const LabelSchema=new mongoose.Schema({
    name:{
        type: String,
        maxLength: 20,
        required: true
    },
    description:{
        type: String,
        maxLength: 200
    },
    backgroundColor:{
        type: String,
        maxLength: 20
    },
    color:{
        type: String,
        maxLength: 20
    }
},{
    timestamps: true
})

const Label=mongoose.model('Label', LabelSchema);

module.exports=Label