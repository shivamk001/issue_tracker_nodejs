//const { default: Project } = require('../models/projects')
// const ObjectId=require('mongoose').ObjectId;
const mongoose=require('mongoose');
const Project=require('../models/project')
const {home}=require('./homeController')

module.exports.allProjects=async ()=>{
    try{
        console.log('All Projects:')
        const projects=await Project.find({}).populate('author', 'username -_id')
        console.log('All Projects:', projects)
        return projects
    }
    catch(err){
        console.error('Error:', err)
        return []
    }
}

module.exports.createProject=async (req, res)=>{
    const {name, description, author}=req.body

    try{
        const project=await Project.create({
            name, description, author
        })
        console.log('Project:', project)
        return res.redirect('/')
        //return res.status(201).json(project)
    }
    catch(err){
        return res.status(200).json({error: err})
    }
}

module.exports.renderCreateProject=(req, res)=>{
    return res.render('projectForm', {author: '653900145784c63eab3a3b25', title: 'Create Project', page: 'projectForm'})
}

module.exports.getAllProjects=async (req, res)=>{
    try{
        console.log('Get All Projects')
        const projects=await Project.find({}).populate('author', 'username -_id')
        console.log('All Projects:', projects)

        return res.status(200).json(projects)
    }
    catch(err){
        console.log('Error:', err)
        return res.status(404).json({error: err})
    }
}

module.exports.showProjectPage=async(req, res)=>{
    console.log("Params:", req.params);
    let {id}=req.params;
    try{
    let _id= new mongoose.Types.ObjectId(id);
    //let _id=new ObjectId(id);
    const project=await Project.findById({_id})
        .populate('author', 'username -_id')
        .populate({path: 'issues', populate: {path: 'author', select:'username -_id'}})
        //.populate('issues.issue.author', 'username -_id');

    console.log(_id, project)
    res.render('projectPage', {project: project, issues: project.issues, title: project.name, page:'projectPage'})
    }
    catch(err){
        console.log('Error:', err)
        return res.status(404).json({error: err})
    }
}

module.exports.deleteProject=async(req, res)=>{
    let {id}=req.params
    try{
        let _id= new mongoose.Types.ObjectId(id);
        //let _id=new ObjectId(id);
        const deletedProject=await Project.findByIdAndDelete(_id);
        console.log("deleted:", _id, deletedProject)
        return res.redirect('/')
    }
    catch(err){
        return res.status(404).json({error: err})
    }
}
