const mongoose=require('mongoose');
const Issue=require('../models/issue');
const Project=require('../models/project')

module.exports.createIssue=async (req, res)=>{
    let {project, title, description, status, author, labels}=req.body;
    try{
        console.log('Label in Issue Created:', labels)
        const issue=await Issue.create({project, title, description, status, author});
        if(typeof labels=='string'){
            issue.labels.push(new mongoose.Types.ObjectId(labels));
        }
        else{
            labels.forEach(label=>{
                issue.labels.push(new mongoose.Types.ObjectId(label));
            })
        }
        issue.save()
        //issue.populate({path: 'labels', populate: {path: 'label', select:'name -_id'}})
        console.log('Issue Created:', issue)



        let projectId= new mongoose.Types.ObjectId(project);
        const reqdProject=await Project.findById(projectId);
        reqdProject.issues.push(issue._id);
        reqdProject.save();
        console.log('Project Issues:', reqdProject);
        //return res.status(201).json(issue)
        return res.redirect(`/project/page/${project}`)
    }
    catch(err){
        console.log('Error in creating issue:', err)
        return res.status(404).json({error: err})
    }
}

module.exports.searchFilterIssues=async (req, res)=>{
    
}