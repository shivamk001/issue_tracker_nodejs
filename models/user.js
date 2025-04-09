const mongoose=require('mongoose')

const bcrypt = require('bcrypt');
const saltRounds = 5;

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
    },
    userType:{
        type: String,
        enum:['admin', 'regular'],
        default: 'regular'
    },
    password:{
        type: String,
        maxLength: 1000
    }
},{
    timestamps: true
})


//a middleware to hash the password before saving
UserSchema.pre('save', function(next) {

    try{
        // do stuff
        let user=this
        console.log('Save middleware:', this)
        
        bcrypt.hash(user.password, 10)
        .then((hash) => {
            user.password = hash;
            next();
        })
        .catch((err) => {
            console.error('Error hashing password:', err);
            next(err); // pass the error to Mongoose
        });

        // const salt = bcrypt.genSaltSync(saltRounds);
        // const hash = bcrypt.hashSync(myPlaintextPassword, salt);
        // user.password=hash
    }
    catch(err){
        console.error('Error in hashing', err);
        next(err);
    }

});

UserSchema.method('comparePassword', function(textPassword){
    let user=this
    console.log('Meow', textPassword, user);
    return bcrypt.compare(textPassword, user.password)
});

const User=mongoose.model('User', UserSchema);

module.exports=User;