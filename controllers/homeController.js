let {allProjects}=require('./projectController')

module.exports.home=async function(req, res){

    //get all user
    let projects=await allProjects()
    console.log('ALLProjects:', projects)
    //print id(used virtuals to create a get function which returns id of a doc in string format)
    // projects.forEach(project=>{
    //     console.log(project.id)
    // })
    return res.render('home', {title: 'IssueTrackerHome', projects});
}

