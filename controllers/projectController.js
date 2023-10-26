//const { default: Project } = require('../models/projects')
const Project=require('../models/project')

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
        return res.status(201).json(project)
    }
    catch(err){
        return res.status(200).json({error: err})
    }
}

module.exports.renderCreateProject=(req, res)=>{
    return res.render('project', {author: '653900145784c63eab3a3b25'})
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