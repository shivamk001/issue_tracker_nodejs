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
        //location.reload()
        let issueCard=document.getElementById(id)
        issueCard.remove()
        console.log("Success:", result);
    }
    catch(err){
        console.error("Error:", err);
    }
}

deleteIssueButton.forEach(button=>{
    button.addEventListener('click', deleteIssue)
})






//HAMBURGER ICON
let hamIcon=document.getElementById('myissueshomeHamburgerIcon')
let hamMenu=document.getElementById('myissueshomeHamburgerMenu')
console.log( hamIcon, hamMenu)

hamIcon.addEventListener('click', ()=>{
    console.log('Visibility:', hamMenu.style.visibility)
    let visible=hamMenu.style.visibility

    if(visible==='hidden'  || visible===''){
        hamMenu.style.display='flex';
        hamMenu.style.top='7%';
        hamMenu.style.opacity='1';
        hamMenu.style.right='3%';
        hamMenu.style.visibility='visible';
    }

    if(visible==='visible'){
        hamMenu.style.visibility='hidden';
        hamMenu.style.opacity='0';
        hamMenu.style.transition='visibility 0s, opacity 0.5s linear';
    }

})