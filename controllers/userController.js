const User=require('../models/user')

module.exports.createUser=async (req, res)=>{
    let {username, email}=req.body

    try{
        let user=await User.create({
            username, email
        })
        console.log('User created:', user)
        return res.status(201).json(user)
    }
    catch(err){
        return res.status(200).json({error: err})
    }

}