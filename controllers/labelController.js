const Label=require('../models/label');

module.exports.createLabel=async (req, res, next)=>{
    let {name, description, color}=req.body;
    try{
        const label=await Label.create({name, description, color});
        console.log('Label Created:', label)

        return res.status(201).json(label)
    }
    catch(err){
        // console.log('Error in creating label:', err)
        // return res.status(400).json({error: err})
        console.log('Error in createLabel:', err)
        next(err)
    }
}