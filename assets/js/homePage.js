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

// let leftContainer=document.querySelector('#leftContainer')
// let body=document.querySelector('body')

// function handleResize(e){
//     console.log(body.offsetHeight, body.offsetWidth)
// }
// body.addEventListener('resize', handleResize)

//HAMBURGER MENU

function showHideHamburgerMenu( icon, menu){
    let hamIcon=document.getElementById(icon)
    let hamMenu=document.getElementById(menu)
    console.log( hamIcon, hamMenu)
    hamIcon.addEventListener('click', ()=>{
        console.log(hamMenu.style.visibility, hamIcon, hamMenu)
        let visible=hamMenu.style.visibility
    
        if(visible==='hidden'  || visible===''){
            hamMenu.style.display='flex';
            hamMenu.style.top='120%';
            hamMenu.style.opacity='1';
            hamMenu.style.right='0%';
            hamMenu.style.visibility='visible';
        }
    
        if(visible==='visible'){
            hamMenu.style.visibility='hidden';
            hamMenu.style.opacity='0';
            hamMenu.style.transition='visibility 0s, opacity 0.5s linear';
        }
    
    })

}


// let hamburgerIcons=[
//     ['hamburgerIcon', 'hamburgerMenu'],
//     // ['mycommentsHamburgerIcon', 'mycommentshomeHamburgerMenu'],
//     // ['myissueshomeHamburgerIcon', 'myissueshomeHamburgerMenu'],
//     // ['myprojectsHamburgerIcon', 'myprojectsHamburgerMenu'],
//     // ['homeHamburgerIcon', 'homeHamburgerMenu']
// ]
// hamburgerIcons.forEach(pair=>{
//     showHideHamburgerMenu(pair[0], pair[1])
// })


let hamIcon=document.getElementById('homeHamburgerIcon')
let hamMenu=document.getElementById('homeHamburgerMenu')
console.log( hamIcon, hamMenu)

hamIcon.addEventListener('click', ()=>{
    console.log('Visibility:', hamMenu.style.visibility)
    let visible=hamMenu.style.visibility

    if(visible==='hidden'  || visible===''){
        hamMenu.style.display='flex';
        hamMenu.style.top='10%';
        hamMenu.style.opacity='1';
        hamMenu.style.right='5%';
        hamMenu.style.visibility='visible';
    }

    if(visible==='visible'){
        hamMenu.style.visibility='hidden';
        hamMenu.style.opacity='0';
        hamMenu.style.transition='visibility 0s, opacity 0.5s linear';
    }

})