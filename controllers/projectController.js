const mongoose=require('mongoose');

const Project=require('../models/project')
const Label=require('../models/label')
const User=require('../models/user')
const Issue=require('../models/issue')
const Comment=require('../models/comment')
const setFlashMessage=require('../utils/setFlashMessage')
// const {home}=require('./homeController')

module.exports.allProjects=async (query)=>{
    try{
        console.log('All Projects:', query)
        const projects=await Project.find(query).populate('author', 'username -_id')
        console.log('All Projects:', projects)
        return projects
    }
    catch(err){
        console.error('Error:', err)
        return []
    }
}

module.exports.createProject=async (req, res, next)=>{
    const {name, description, author}=req.body

    try{
        if(description.length>1000){
            throw new Error("User Error: Description length must be less than 1000 characters.");
        }
        const project=await Project.create({
            name, description, author
        })
        console.log('Project:', project)
        req.flash('success', 'Project created!')
        return res.redirect('/')
        //return res.status(201).json(project)
    }
    catch(err){
        console.log('Project Creation Error:', err)
        //return res.status(500).json({error: err})
        next(err)
    }
}

module.exports.renderCreateProject=(req, res)=>{
    console.log('User in renderCreateProject:', req.user.id)
    return res.render('projectForm', { title: 'Create Project', page: 'projectForm', author: req.user, user: req.user.id })
}

module.exports.getAllProjects=async (req, res, next)=>{
    try{
        console.log('Get All Projects')
        const projects=await Project.find({}).populate('author', 'username -_id')
        console.log('All Projects:', projects)

        return res.status(200).json(projects)
    }
    catch(err){
        console.log('Error in getAllProjects:', err)
        // return res.status(404).json({error: err})
        next(err)
    }
}

module.exports.showProjectPage=async(req, res, next)=>{
    console.log('SHOW PROJECT PAGE')
    console.log("Params:", req.params);
    console.log('METHOD:', req.method);
    console.log('REQ BODY:', req.body);
    //console.log('Flash Message:', req.flash())

    let {title, description, authors, labels}=req.body
    let {id}=req.params;
    try{
    let _id= new mongoose.Types.ObjectId(id);
    console.log('Title:', title)
    console.log("Labels:", labels)
    
    let authorMatch={}, labelMatch={}, titleDescriptionMatch={}
    if(title){
        titleDescriptionMatch.title=title
    }
    if(description){
        titleDescriptionMatch.description={ $regex: description, $options: 'i'}
    }
    if(authors){
        let allAuthors=authors.split(',').slice(0, -1)
        console.log('All Authors:', allAuthors)
        authorMatch['username']={$in: allAuthors}

    }
    if(labels){
        let allLabels=labels.split(',').slice(0, -1);
        console.log('All Labels:', allLabels)
        labelMatch.name={$in: allLabels}
    }   
    console.log('Title Description Match:', titleDescriptionMatch)
    console.log('Author Match:', authorMatch)
    console.log('Label Match:', labelMatch)


    //AUTHOR MATCH: match:{"username":{$in: ['shivamk001',]}}
    //LABELS MATCH: match:{name: {$in: query['label']}}
    //TITLE DESCRIPTION MATCH: match:{title: title, description:description}
    let project={}

    // if(titleDescriptionMatch){
    //     console.log('Inside:', titleDescriptionMatch)
    //     project=await Project.findById({_id:_id})
    //     .populate('author', 'username -_id')
    //     .populate({path: 'issues',  populate: {path: 'author', select:'username -_id'}})
    //     .populate({path: 'issues', populate: {path: 'comments', populate: {path: 'author', select:'username -_id'}}})
    //     .populate({path: 'issues', match: titleDescriptionMatch, populate: {path: 'labels'}})
    // }
    // else{
        project=await Project.findById({_id:_id})
        .populate('author', 'username -_id')
        .populate({path: 'issues', populate: {path: 'comments', populate: {path: 'author', select:'username -_id',}}})
        .populate({path: 'issues',  populate: {path: 'author', select:'username -_id',  match: authorMatch}})
        .populate({path: 'issues', populate: {path: 'labels', match: labelMatch}, match: titleDescriptionMatch})
    // }


    let eligibleIssues=0
    project.issues.forEach(issue=>{
        console.log(issue.title)
        console.log(issue.labels.length)
        console.log('Comments:', issue.comments)
        issue.comments.forEach(comment=>{
            console.log('DATE:', comment.createdAt)
        })
        if(issue.labels.length>0 && !(issue.author===null)){
            eligibleIssues++;
        }
    })
    
    console.log("Total Issues in Project:",project.issues)

    const labelss=await Label.find({}).select('name _id')
    const Users=await User.find({}).select('username -_id')

    console.log('ELIGIBLE ISSUES:', eligibleIssues)
    if(project.issues.length===0 || eligibleIssues===0){
        req.flash('warning', 'No Issue Found With Matching Name, Descrption, Author, Label.')
    }
    else{
        req.flash('info', 'Showing Search Results.')
    }

    //SET FLASHMESSAGE
    let flashObject=req.flash()
    console.log('Flash Message:', flashObject)
    let flashMessage=setFlashMessage(flashObject)
    console.log('FLASHMESSAGE:', flashMessage)
    //console.log("Project Page:", project)
    return res.render('projectPage', {project: project, labels: labelss, author: req.user, issues: project.issues, title: project.name, page:'projectPage', users: Users, flashMessage})
    //return res.status(201).json({ project })    
    }
    catch(err){
        console.log('Error in showProjectPage:', err)
        // return res.status(404).json({error: err})
        next(err)
    }
}

module.exports.deleteProject=async(req, res, next)=>{
    let {id}=req.params
    try{
        let _id= new mongoose.Types.ObjectId(id);
        //let _id=new ObjectId(id);
        let project=await Project.findById(_id);
        // project.issues.forEach(async (issue)=>{
        //     console.log('Issue:', issue)
        //     let issueId=new mongoose.Types.ObjectId(issue);
        //     let deletedIssue=await Issue.findByIdAndDelete(issueId);
        //     console.log('Deleted Issue:', deleteIssue)
        // })
        project.issues.forEach(async issue=>{
            await Comment.deleteMany({'issue': issue._id })
        })
        let deletedIssues=await Issue.deleteMany({_id:{$in:project.issues}});
        console.log('Deleted Issues:', deletedIssues);
        const deletedProject=await Project.findByIdAndDelete(_id);
        console.log("deleted:", _id, deletedProject)
        req.flash('info', 'Project Deleted!')
        return res.redirect('/')
    }
    catch(err){
        // return res.status(404).json({error: err})
        console.log('Error in deleteProject:', err)
        next(err)
    }
}

module.exports.getUserProjects=async (req, res, next)=>{
    try{
        console.log('Get User Projects:', req.params.id)
        let query={author: req.params.id}
        const allProjects=await Project.find(query).populate('author', 'username -_id')
        console.log('All Projects:', allProjects)

        //return res.status(200).json(allProjects)
        return res.render('allMyProjects', {allMyProjects: allProjects, page: 'userProjects', author: req.user})
    }
    catch(err){
        // console.log('Error:', err)
        // return res.status(404).json({error: err})
        console.log('Error in getUserProjects:', err)
        next(err)
    }
}
 