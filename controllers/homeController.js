let {allProjects}=require('./projectController')

module.exports.home=async function(req, res){

    //get all user
    let projects=await allProjects()
    console.log('ALLProjects:', projects)
    return res.render('home', {title: 'IssueTrackerHome', projects});
}

