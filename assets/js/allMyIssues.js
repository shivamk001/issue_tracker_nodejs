//DELETE ISSUE BUTTONS
let deleteIssueButton=document.querySelectorAll('.deleteIssueButton')

async function deleteIssue(e){
    try{
        //let element=e.target
        let currentElement=e.currentTarget
        //console.log('Element:', element)
        console.log('Current Element:', currentElement)
        let id=currentElement.getAttribute('data-id')
        console.log('ID:', id)
        let response=await fetch('/issue/delete',{
            method: "DELETE",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({id})
        })
        const result=await response.json()
        location.reload()
        console.log("Success:", result);
    }
    catch(err){
        console.error("Error:", err);
    }
}

deleteIssueButton.forEach(button=>{
    button.addEventListener('click', deleteIssue)
})