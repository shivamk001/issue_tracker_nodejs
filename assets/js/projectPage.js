let createIssueButton=document.getElementById('createIssueButton')
let createIssueFormSection=document.getElementById('createIssueFormSection')
let closeIssueFormButton=document.getElementById('closeIssueFormButton')

function closeIssueForm(){
    createIssueFormSection.style.display='none'
}
closeIssueFormButton.addEventListener('click', closeIssueForm)

function displayIssueForm(){
    console.log(
        'In displayIssueForm'
    )
    createIssueFormSection.style.display='flex'
    createIssueFormSection.style.flexDirection='row'
    createIssueFormSection.style.alignItems='center'
    createIssueFormSection.style.justifyContent='center'
    createIssueFormSection.style.zIndex=1000
}

createIssueButton.addEventListener('click', displayIssueForm)