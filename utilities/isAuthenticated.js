module.exports.isAuthenticated=function(req, res, next){
    if(req.isAuthenticated()){
        next();
    }
    else{
        return res.redirect('/user/login')
    }
}

module.exports.isAuthenticatedLoggedIn=function(req, res, next){
    if(!req.isAuthenticated()){
        next();
    }
    else{
        return res.redirect('/user/login')
    }
}

