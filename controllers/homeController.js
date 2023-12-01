let {allProjects}=require('./projectController')
const setFlashMessage=require('../utilities/setFlashMessage')

//DISPLAY THE HOMEPAGE
module.exports.home=async function(req, res, next){
    try{
        //get all user
        //console.log('HOME REQ.BODY:', req.query)
        let {name, description}=req.query
        let query={}
        if(name){
            query.name=name
        }
        if(description){
            query.description={$regex: description, $options: 'i'}
        }
        //console.log('QUERY:', query)

        
        
        
        let projects=await allProjects(query)
        //console.log('ALLProjects:', projects)
        // projects.forEach(project=>{
        //     console.log('Project Issue Length:', project.issues.length)
        // })
        //console.log('User in homeController:', req.user)
        
        if(req.user){
            console.log('REQ AFTER LOGIN:', req.user, req.session.passport)
        }
        //console.log('Homepage user:', req.user)

        //SET REQ.FLASH
        if(projects.length===0){
            req.flash('warning', 'No Project Found With Matching Name Or Descrption.')
        }
        else{
            if(Object.keys(query).length!==0){
                req.flash('info', 'Showing Search Results.')
            }
            
        }

        //SET FLASHMESSAGE
        let flashObject=req.flash()
        let flashMessage=setFlashMessage(flashObject)
        //console.log('Flash Message:', flashObject)
        //console.log('FLASHMESSAGE:', flashMessage)

        return res.render('home', { title: 'IssueTrackerHome', projects, page: 'home', author: req.user, flashMessage });
    }
    catch(err){
        next(err)
    }
}

