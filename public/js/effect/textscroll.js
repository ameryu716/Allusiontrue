window.addEventListener("DOMContentLoaded",()=>{
    setTimeout(() => {
        let scro = document.getElementsByClassName("card-title");
        for(let i=0;i<scro.length;i++){
            let scrotext = scro[i].getElementsByTagName("span");
            if(scrotext[0].innerText.length>6){
                scrotext[0].classList.add("scrolltype");
                console.log("scrolladd!!");
            }else{
                console.log("Noif!!");
            }
        }
    }, 3000)
});
