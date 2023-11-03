//CREATE PROJECT FORM SECTION
let createProjectButton=document.getElementById('createProjectButton')
let createProjectFormSection=document.getElementById('createProjectFormSection')
let closeProjectFormButton=document.getElementById('closeProjectFormButton')

function closeProjectForm(){
    createProjectFormSection.style.display='none'
}
closeProjectFormButton.addEventListener('click', closeProjectForm)

function displayCreateProjectForm(){
    console.log('In displayCreateProjectForm')
    createProjectFormSection.style.display='flex'
    createProjectFormSection.style.flexDirection='row'
    createProjectFormSection.style.alignItems='center'
    createProjectFormSection.style.justifyContent='center'
    createProjectFormSection.style.zIndex=1000
}
createProjectButton.addEventListener('click', displayCreateProjectForm)