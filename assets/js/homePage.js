//CREATE PROJECT FORM SECTION
// let createProjectButton=document.getElementById('createProjectButton')
// let createProjectFormSection=document.getElementById('createProjectFormSection')
// let closeProjectFormButton=document.getElementById('closeProjectFormButton')

// function closeProjectForm(){
//     createProjectFormSection.style.display='none'
// }
// closeProjectFormButton.addEventListener('click', closeProjectForm)

// function displayCreateProjectForm(){
//     console.log('In displayCreateProjectForm')
//     createProjectFormSection.style.display='flex'
//     createProjectFormSection.style.flexDirection='row'
//     createProjectFormSection.style.alignItems='center'
//     createProjectFormSection.style.justifyContent='center'
//     createProjectFormSection.style.zIndex=1000
// }
// createProjectButton.addEventListener('click', displayCreateProjectForm)



//SEARCH PROJECT FORM SECTION
let searchProjectButton=document.getElementById('searchProjectButton')
let searchProjectFormSection=document.getElementById('searchProjectFormSection')
let closeSearchProjectFormButton=document.getElementById('closeSearchProjectFormButton')

function closeSearchProjectForm(){
    searchProjectFormSection.style.display='none'
}
closeSearchProjectFormButton.addEventListener('click', closeSearchProjectForm)

function displaySearchProjectForm(){
    console.log('In displaySearchProjectForm')
    searchProjectFormSection.style.display='flex'
    searchProjectFormSection.style.flexDirection='row'
    searchProjectFormSection.style.alignItems='center'
    searchProjectFormSection.style.justifyContent='center'
    searchProjectFormSection.style.zIndex=1000
}
searchProjectButton.addEventListener('click', displaySearchProjectForm)