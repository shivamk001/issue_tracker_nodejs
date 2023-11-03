
//CREATE ISSUE FORM SECTION
let createIssueButton=document.getElementById('createIssueButton')
let createIssueFormSection=document.getElementById('createIssueFormSection')
let closeIssueFormButton=document.getElementById('closeIssueFormButton')

function closeIssueForm(){
    createIssueFormSection.style.display='none'
}
closeIssueFormButton.addEventListener('click', closeIssueForm)

function displayIssueForm(){
    console.log('In displayIssueForm')
    createIssueFormSection.style.display='flex'
    createIssueFormSection.style.flexDirection='row'
    createIssueFormSection.style.alignItems='center'
    createIssueFormSection.style.justifyContent='center'
    createIssueFormSection.style.zIndex=1000
}

createIssueButton.addEventListener('click', displayIssueForm)





//Search Section
let searchButton=document.getElementById('searchButton')
let searchSection=document.getElementById('searchSection')

let closeSearchButton=document.getElementById('closeSearchButton')
function closeSearchForm(){
    searchSection.style.display='none'
}
closeSearchButton.addEventListener('click', closeSearchForm)

function displaySearchForm(){
    console.log('In displaySearchForm')
    searchSection.style.display='flex'
    searchSection.style.flexDirection='row'
    searchSection.style.alignItems='center'
    searchSection.style.justifyContent='center'
    searchSection.style.zIndex=1000
}
searchButton.addEventListener('click', displaySearchForm)






//Filter Section
let filterButton=document.getElementById('filterButton')
let filterSection=document.getElementById('filterSection')

let closeFilterButton=document.getElementById('closeFilterButton')
function closeFilterForm(){
    filterSection.style.display='none'
}
closeFilterButton.addEventListener('click', closeFilterForm)

function displayFilterForm(){
    console.log(
        'In displayFilterForm'
    )
    filterSection.style.display='flex'
    filterSection.style.flexDirection='row'
    filterSection.style.alignItems='center'
    filterSection.style.justifyContent='center'
    filterSection.style.zIndex=1000
}
filterButton.addEventListener('click', displayFilterForm)







//label buttons in search issue form
let searchIssueFormLabelsInput=document.getElementById('searchIssueFormLabelsInput');
let allLabelButtons=document.querySelectorAll('.labelButtons')
//on clicking on a label in search issue form
function handleClickLabel(e){
    let element=e.target
    console.log("Button:", element)
    let isChecked=element.getAttribute('checked')=='true'?true:false
    let labelName=element.textContent
    if(isChecked){
        //change class
        element.setAttribute('checked', false)
        element.classList.remove('labelButtonsChecked')
        element.classList.add('labelButtons')

        //remove from input
        let val=searchIssueFormLabelsInput.value
        let selectedLabelsArr=val.split(',').slice(0, -1)
        let newVal=''
        selectedLabelsArr.forEach(label=>{
            if(label!=labelName){
                newVal+=label+','
            }
        })
        searchIssueFormLabelsInput.value=newVal
        console.log('searchIssueFormLabelsInput Value after removing:', searchIssueFormLabelsInput.value)
    }
    else{
        //add to input
        element.setAttribute('checked', true)
        element.classList.add('labelButtonsChecked')
        element.classList.remove('labelButtons')
        let val=searchIssueFormLabelsInput.value
        if(val.length==0){
            console.log('Element Value:', labelName)
            searchIssueFormLabelsInput.value=''
        }
        searchIssueFormLabelsInput.value+=labelName+','
        console.log('searchIssueFormLabelsInput Value after adding:', searchIssueFormLabelsInput.value)
    }
}
allLabelButtons.forEach(labelButton=>{
    labelButton.addEventListener('click', handleClickLabel)
})







//author buttons in search issue form
let searchIssueFormAuthorsInput=document.getElementById('searchIssueFormAuthorsInput')
let allAuthorButtons=document.querySelectorAll('.authorButtons')
//on clicking on a username in search issue form
function handleClickAuthor(e){
    let element=e.target
    console.log("Button:", element)
    let isChecked=element.getAttribute('checked')=='true'?true:false
    let authorName=element.textContent
    if(isChecked){
        //change class
        element.setAttribute('checked', false)
        element.classList.remove('authorButtonsChecked')
        element.classList.add('authorButtons')

        //remove from input
        let val=searchIssueFormAuthorsInput.value
        let selectedAuthorsArr=val.split(',').slice(0, -1);
        let newVal=''
        selectedAuthorsArr.forEach(author=>{
            if(author!=authorName){
                newVal+=author+','
            }
        })
        searchIssueFormAuthorsInput.value=newVal
        console.log('searchIssueFormAuthorsInput value after removing:', searchIssueFormAuthorsInput.value)
    }
    else{
        //change class
        element.setAttribute('checked', true)
        element.classList.add('authorButtonsChecked')
        element.classList.remove('authorButtons')

        //add to input value
        let val=searchIssueFormAuthorsInput.value
        if(val.length==0){
            searchIssueFormAuthorsInput.value=''
        }
        searchIssueFormAuthorsInput.value+=element.textContent+','
        console.log('searchIssueFormAuthorsInput value after adding:', searchIssueFormAuthorsInput.value)
    }
}
allAuthorButtons.forEach(labelButton=>{
    labelButton.addEventListener('click', handleClickAuthor)
})



//clear issue filter form
let filterIssueForm=document.getElementById('filterIssueForm')
filterIssueForm.reset()

//clear issue search form
let searchIssueForm=document.getElementById('searchIssueForm')
searchIssueForm.reset()