const mongoose=require('mongoose');
const Issue=require('../models/issue');
const Project=require('../models/project');
const Comment=require('../models/comment');

module.exports.createIssue=async (req, res, next)=>{
    let {project, title, description, status, author, labels}=req.body;
    try{
        console.log('Label in Issue Created:', labels)
        console.log('Project _id:', project)
        console.log('Labels:', labels)
        let labelsArray=labels.split(',').slice(0,-1);
        console.log('Labels Array:', labelsArray)
        console.log('Description Length:', description.length)
        
        if(description.length>500){
            throw new Error("User Error: Description length must be less than 500 characters.");
        }
        if(labelsArray.length===0){
           throw new Error("User Error: Please select at least one label");
        }
        else{
            const issue=await Issue.create({project, title, description, status, author});
            labelsArray.forEach(label=>{
                let labelid=label.split('|')[1]
                console.log('Labels Id:', labelid)
                issue.labels.push(new mongoose.Types.ObjectId(labelid));
            })
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
    }
    catch(err){
        console.log('Error in createIssue:',err)
        next(err)
    }
}



module.exports.getUserIssues=async (req, res, next)=>{
    let {id}=req.params;
    try{
        let userId=new mongoose.Types.ObjectId(id);
        let allIssues=await Issue.find({author: userId}).populate({path: 'project', select: 'name -_id'}).populate({path: 'labels', select: 'name color backgroundColor -_id'})
        console.log('AllIssues:', allIssues.labels)
        return res.render('allMyIssues', {allIssues: allIssues, author: req.user, page: 'userIssues'})
        //return res.status(200).json(allIssues)
    }
    catch(err){
        // console.log('Err:', err)
        // return res.status(404).json(err)
        console.log('Error in getUserIssues:',err)
        next(err)
    }
}

module.exports.deleteIssue=async (req, res, next)=>{
    let {id}=req.body
    try{
        console.log('ID:', id)
        let _id=new mongoose.Types.ObjectId(id);
        
        //get the document
        let issue=await Issue.findById({_id});
        
        //get the project
        let projectId=issue.project
        let project=await Project.findById(projectId);

        //delete the issue from the project
        project.issues.remove(id);
        project.save()

        //delete all the comments with this issue
        let deletedComment=await Comment.deleteMany({issue: issue._id})
        console.log('Deleted Comments:', deletedComment);
        
        //delete the issue
        let deletedIssue=await Issue.findByIdAndDelete(_id);
        console.log('Deleted Issue:', deletedIssue)
        return res.status(200).json(deletedIssue)
    }
    catch(err){
        // console.log('Err:', err)
        // return res.status(404).json(err)
        console.log('Error in deleteIssue:',err)
        next(err)
    }

}