const User=require('../models/user')

module.exports.renderSignup=async (req, res)=>{
    try{
        return res.render('signupForm', {page: 'signup', title: 'signup'})
    }
    catch(err){
        console.log(err);
        return res.status(504).json(err)
    }
}
module.exports.createUser=async (req, res)=>{
    let {username, email, password, userType, confirmPassword}=req.body
    console.log('Signup:', username, email, password, userType, confirmPassword)
    try{
        if(password===confirmPassword){
            let user=await User.create({
                username, email, password, userType
            })
            console.log('User created:', user)
            return res.redirect('/user/login')
        }
        else{
            return res.redirect('/user/signup')
        }
    }
    catch(err){
        return res.status(200).json({error: err})
    }
}




module.exports.renderLogin=async (req, res)=>{
    try{
        return res.render('loginForm', {page: 'login', title: 'Login', /*user: undefined*/})
    }
    catch(err){
        console.log(err);
        return res.status(504).json(err)
    }
}
module.exports.loginUser=async (req, res)=>{
    try{
        return res.render('loginForm', {page: 'login', title: 'Login'})
    }
    catch(err){
        console.log(err);
        return res.status(504).json(err)
    }
}

module.exports.logoutUser=(req, res, next)=>{
    req.logout(function(err){
        if(err){return next(err);}
        return res.redirect('/')
    })
}