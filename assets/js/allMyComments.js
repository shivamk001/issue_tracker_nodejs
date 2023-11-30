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



//HAMBURGER ICON
let hamIcon=document.getElementById('mycommentsHamburgerIcon')
let hamMenu=document.getElementById('mycommentshomeHamburgerMenu')
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