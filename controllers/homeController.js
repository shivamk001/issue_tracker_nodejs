let {allProjects}=require('./projectController')

module.exports.home=async function(req, res, next){
    try{
        //get all user
        console.log('HOME REQ.BODY:', req.query)
        let {name, description}=req.query
        let query={}
        if(name){
            query.name=name
        }
        if(description){
            query.description={$regex: description, $options: 'i'}
        }
        console.log('QUERY:', query)
        
        let projects=await allProjects(query)
        console.log('ALLProjects:', projects)
        projects.forEach(project=>{
            console.log('Project Length:', project.issues.length)
        })
        console.log('User in homeController:', req.user)
        if(req.user){
            console.log('REQ AFTER LOGIN:', req.user, req.session.passport)
        }
        console.log('Homepage user:', req.user)
        return res.render('home', { title: 'IssueTrackerHome', projects, page: 'home', author: req.user });
    }
    catch(err){
        next(err)
    }
}

