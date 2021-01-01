const header = document.getElementsByClassName("header");
const headerspan = header[0].getElementsByTagName("span");
const logbgroup = header[0].getElementsByClassName("formin-group");
const shrink = false;

setTimeout(()=>{
    header[0].style.height = "40px";
    headerspan[0].style.fontSize = "30px";
    headerspan[0].style.padding = "0";
    headerspan[0].style.transition = "0.5s";
    logbgroup[0].style.padding = "4px";
    logbgroup[0].style.width = "135px";
    for(let i=0; i<3;i++){
        headerspan[i].classList.toggle("shrinklogbtn");
    }
},3000)

header[0].addEventListener("mouseenter", ()=>{
    header[0].style.height = "60px";
    headerspan[0].style.fontSize = "36px";
    headerspan[0].style.padding = "6px";
    logbgroup[0].style.padding = "13px";
    logbgroup[0].style.width = "170px";
    for(let i=0; i<3;i++){
        headerspan[i].classList.toggle("shrinklogbtn");
    }
})
header[0].addEventListener("mouseleave", ()=>{
    header[0].style.height = "40px";
    headerspan[0].style.fontSize = "30px";
    headerspan[0].style.padding = "0";
    logbgroup[0].style.padding = "4px";
    logbgroup[0].style.width = "135px";
    for(let i=0; i<3;i++){
        headerspan[i].classList.toggle("shrinklogbtn");
    }
})

