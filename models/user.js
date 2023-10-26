const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    username:{
        type: String,
        required: true,
        maxLength: 20,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    }
},{
    timestamps: true
})

const User=mongoose.model('User', UserSchema);

module.exports=User;