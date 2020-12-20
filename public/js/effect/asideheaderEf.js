export const aheadEffect = function(){
    setTimeout(() => {
        const asideheader = document.getElementsByClassName("asideheader");
        console.log("ASIDEHEADER:"+asideheader[0]);
        setTimeout(()=>{
            asideheader[0].style.opacity = "0";
        },3000)

        asideheader[0].addEventListener("mouseenter", ()=>{
            asideheader[0].style.opacity = "1";
        })
        asideheader[0].addEventListener("mouseleave", ()=>{
            asideheader[0].style.opacity = "0";
        })
    }, 1000);
};