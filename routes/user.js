const express=require('express')
const router=express.Router()

const User=require('../models/user')
var passport = require('passport');
var LocalStrategy = require('passport-local');
passport.use(new LocalStrategy(async function verify(username, password, done){
    try{
        const user=await User.findOne({username});
        console.log('User in LocalStrategy:', user, user.password)
        if(!user){ return done(null, false); }
        let result=await user.comparePassword(password);
        console.log('Result in localstrategy:', result)
        if(result){
            console.log('redirect to /')
            return done(null, user);
        }
        else{
            console.log('redirect to /login')
            return done(null, false);
        }
    }
    catch(err){
        if(err){ return done(err); }
    }
    
}));

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
});

passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
});

const userController=require('../controllers/userController')

router.get('/signup', userController.renderSignup)
router.post('/create', userController.createUser)
router.post('/update', userController.updateUser)
router.get('/userPage/:id', userController.renderUserDetailsPage)

router.get('/login', userController.renderLogin)
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/user/login'
  }))//, userController.loginUser)

router.get('/logout', userController.logoutUser);


module.exports=router