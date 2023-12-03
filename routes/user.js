const express=require('express')
var passport = require('passport');
var LocalStrategy = require('passport-local');

const router=express.Router()

const User=require('../models/user')


//CONFIGURE PASSPORT TO USE LOCAL STRATEGY
passport.use(new LocalStrategy({passReqToCallback: true}, async function verify(req, username, password, done){
    try{
        const user=await User.findOne({username});
        //console.log('User in LocalStrategy:', user, user.password)
        if(!user){ return done(null, false); }
        let result=await user.comparePassword(password);
        //console.log('Result in localstrategy:', result)
        if(result){
            //console.log('redirect to /')
            return done(null, user);
        }
        else{
            console.log('redirect to /login', req.flash('error'))
            //req.flash('warning', 'Incorrect username or password.')
            return done(null, false);
        }
    }
    catch(err){
        if(err){ return done(err); }
    }
    
}));

//SERIALIZE USER
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
});

//DESERIALIZE USER
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
});

const userController=require('../controllers/userController')
const {isAuthenticated, isAuthenticatedLoggedIn}=require('../utilities/isAuthenticated')


//FOR NON AUTHENTICATED USER
//SIGNUP ROUTE
// router.use(isAuthenticatedLoggedIn)
router.get('/signup', userController.renderSignup)
//CREATE USER ROUTE
router.post('/create', userController.createUser)
//LOGIN USER ROUTE
router.get('/login', userController.renderLogin)
//ROUTE AFTER USER HAS SUBMITTED PASSWORD AND USERNAME 
router.post('/login', passport.authenticate('local', {
    //successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash:'Incorrect username or password entered.',
    // successFlash: 'Login successful!'
  }), userController.loginUser)

//FOR AUTHENTICATED USER ONLY
router.use(isAuthenticated)
//UPDATE USER DETAILS ROUTE
router.post('/update', userController.updateUser)
//ROUTE TO SHOW USER DETAILS PAGE
router.get('/userPage/:id', userController.renderUserDetailsPage)
//LOGOUT USER ROUTE
router.get('/logout', userController.logoutUser);


module.exports=router