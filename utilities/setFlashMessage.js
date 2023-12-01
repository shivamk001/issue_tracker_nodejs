module.exports=function setFlashMessage(flashObject){
    console.log('FLASH:', flashObject)
    let flashMessage={}
    if(flashObject.hasOwnProperty('success')){
        flashMessage.success=flashObject.success
    }
    else if(flashObject.hasOwnProperty('info')){
        flashMessage.info=flashObject.info
    }
    else if(flashObject.hasOwnProperty('warning')){
        flashMessage.warning=flashObject.warning
    }
    return flashMessage
}