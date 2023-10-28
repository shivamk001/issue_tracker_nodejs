const express=require('express')
const router=express.Router()

const User=require('../models/user')
var passport = require('passport');
var LocalStrategy = require('passport-local');
passport.use(new LocalStrategy(async function verify(username, password, done){
    try{
        const user=await User.findOne({username})
        console.log('User in LocalStrategy:', user, user.password)
        if(!user){ return done(null, false); }
        if(user.password!=password){ return done(null, false);}
        return done(null, user);
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

router.get('/login', userController.renderLogin)
router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }))//, userController.loginUser)

router.get('/logout', userController.logoutUser);


module.exports=router