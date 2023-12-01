const mongoose=require('mongoose')
const User=require('../models/user')





module.exports.renderSignup=async (req, res, next)=>{
    try{
        return res.render('signupForm', {page: 'signup', title: 'signup'})
    }
    catch(err){
        console.log('Error in renderSignup:', err);
        // return res.status(504).json(err)
        
        next(err)
    }
}






module.exports.createUser=async (req, res, next)=>{
    let {username, email, password, userType, confirmPassword}=req.body
    console.log('Signup:', username, email, password, userType, confirmPassword)
    try{
        if(password===confirmPassword){
            let user=await User.create({
                username, email, password, userType
            })
            
            console.log('User created:', user)
            req.flash('info', 'User created successfully!')
            return res.redirect('/user/login')
        }
        else{
            return res.redirect('/user/signup')
        }
    }
    catch(err){
        // console.log('error:', err)
        // return res.status(200).json({error: err})
        console.log('Error in createUser:', err);
        next(err)
    }
}






module.exports.renderLogin=async (req, res, next)=>{
    try{
        return res.render('loginForm', {page: 'login', title: 'Login', /*user: undefined*/})
    }
    catch(err){
        // console.log(err);
        // return res.status(504).json(err)
        console.log('Error in renderLogin:', err);
        next(err)
    }
}





module.exports.loginUser=async (req, res, next)=>{
    try{
        console.log('Flash Message:', req.flash('info'))
        return res.render('loginForm', {page: 'login', title: 'Login'})
    }
    catch(err){
        // console.log(err);
        // return res.status(504).json(err)
        console.log('Error in loginUser:', err);
        next(err)
    }
}





module.exports.logoutUser=(req, res, next)=>{
    try{
        req.logout(function(err){
            if(err){return next(err);}
            return res.redirect('/')
        })
    }
    catch(err){
        console.log('Error in logoutUser:', err);
        next(err)
    }
}





module.exports.renderUserDetailsPage=async (req, res, next)=>{
    try{
        
        let {username}=req.user
        console.log('User:', req.user, username)
        let user=await User.findOne({username})
        console.log('User:', user)
        return res.render('userDetailsPage', {page: 'userDetailsPage', author: req.user, user: user, title: 'My Account'})
    }
    catch(err){
        // console.log(err);
        // return res.status(504).json(err)
        console.log('Error in renderUserDetailsPage:', err);
        next(err)
    }
}




module.exports.updateUser=async (req, res, next)=>{
    let {username, password}=req.body
    console.log('Signup:', username, email, password, userType, confirmPassword)
    try{
        console.log('UpdateUser:', username, req.user.username)
        if(req.user.username===username){
            await User.findByIdAndUpdate({password})
            return res.redirect('/')
        }
        else{
            return res.status(404).json({error: err})
        }
    }
    catch(err){
        console.log('error in updateUser:', err)
        // return res.status(404).json({error: err})
        next(err)
    }
}