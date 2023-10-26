//const { default: Project } = require('../models/projects')
// const ObjectId=require('mongoose').ObjectId;
const mongoose=require('mongoose');
const Project=require('../models/project')
const {home}=require('./homeController')

module.exports.allProjects=async ()=>{
    try{
        const projects=await Project.find({}).populate('author', 'username -_id')
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
    return res.render('projectForm', {author: '653900145784c63eab3a3b25', title: 'Create Project'})
}

module.exports.getAllProjects=async(req, res)=>{
    try{
        const projects=await allProjects()
        console.log('All Projects:', projects)

        return res.status(200).json(projects)
    }
    catch(err){
        return res.status(404).json({error: err})
    }
}

module.exports.showProjectPage=async(req, res)=>{
    console.log("Params:", req.params);
    let {id}=req.params;
    let _id= new mongoose.Types.ObjectId(id);
    //let _id=new ObjectId(id);
    const project=await Project.findOne({_id}).populate('author', 'username -_id');
    console.log(_id, project)
    res.render('projectPage', {project: project, title: project.name})
}