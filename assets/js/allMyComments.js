//DELETE ISSUE BUTTONS
let deleteCommentButton=document.querySelectorAll('.deleteCommentButton')

async function deleteComment(e){
    try{
        //let element=e.target
        let currentElement=e.currentTarget
        //console.log('Element:', element)
        console.log('Current Element:', currentElement)
        let id=currentElement.getAttribute('data-id')
        console.log('ID:', id)
        let response=await fetch('/comment/delete',{
            method: "DELETE",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({id})
        })
        const result=await response.json()
        let commentCard=document.getElementById(id)
        commentCard.remove()
        //location.reload()
        console.log("Success:", result);
    }
    catch(err){
        console.error("Error:", err);
    }
}

deleteCommentButton.forEach(button=>{
    button.addEventListener('click', deleteComment)
})