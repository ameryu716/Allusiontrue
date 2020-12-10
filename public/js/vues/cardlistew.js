const onecardnent = Vue.component("minicard",{
    props: {
        onecard: Object
    },
    template: `
    <li class="animecard">
        <div class="anime-img-board">
            <img :src="onecard.thumbnail" class="anime-sumbnail">
        </div>
        <div class="anime-cnt-board">
            <div class="title-board">
                <div class="card-title">
                    <span>{{onecard.title}}</span>
                </div>
                <span class="date">{{onecard.sawdate}}</span>
            </div>
            <div class="card-content">
                {{onecard.contlen}}
            </div>
        </div>
    </li> `
})

export {onecardnent};

// const asideheader = document.getElementsByClassName("asideheader");
// console.log(asideheader[0]);
// setTimeout(()=>{
//     asideheader[0].style.opacity = "0";
// },3000)

// asideheader[0].addEventListener("mouseenter", ()=>{
//     asideheader[0].style.opacity = "1";
// })
// asideheader[0].addEventListener("mouseleave", ()=>{
//     asideheader[0].style.opacity = "0";
// })



// v-bind:key="item.id"
//                         v-bind:title="item.title"
//                         v-bind:thumbnail="item.thumbnail"
//                         v-bind:sawdate="item.sawdate"
//                         v-bind:contlen="item.contlen"
//                         v-bind:creater="item.creater"
//                         v-bind:onaired="item.onaired"
//                         v-bind:conttype="item.conttype"
//                         v-bind:scale="item.scale"
//                         v-bind:freetext="item.freetext"