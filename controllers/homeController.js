let {allProjects}=require('./projectController')

module.exports.home=async function(req, res){

    //get all user
    console.log('HOME REQ.BODY:', req.query)
    let {name, description}=req.query
    let query={}
    if(name){
        query.name=name
    }
    if(description){
        query.description=description
    }
    console.log('QUERY:', query)
    let projects=await allProjects(query)
    console.log('ALLProjects:', projects)

    if(req.user){
        console.log('REQ AFTER LOGIN:', req.user, req.session.passport)
    }
    console.log('Homepage user:', req.user)
    return res.render('home', { title: 'IssueTrackerHome', projects, page: 'home', author: req.user });
}

