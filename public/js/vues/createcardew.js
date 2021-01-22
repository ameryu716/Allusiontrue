import {imgOptimization} from "../effect/imgUpload.js";

const creatent = Vue.component("CCard", {
    props:{
        art: Array,
        ons: Number,
        usrname: String,
        darktheme: Boolean
    },
    template: `
    <main id="artcardew" class="createcardew artcardew">
        <div class="lefter">
            <div class="object anime-img">
                <div id="imgprev"></div>
                <img :src="art[ons].thumbnail" id="profileimg">
            </div>
            <div class="object when"><span class="divname">When</span><i class="far fa-calendar-alt"></i><span class="divcontents">{{art[ons].sawdate}}</span></div>
            <div class="object created"><span class="divname">Created</span><span class="divcontents">{{art[ons].creater}}</span></div>
            <div class="object else written"><span class="divname">Written</span><span class="divcontents">{{usrname}}</span></div>
            <div class="object onaired"><span class="divname">Onaired</span><span class="divcontents">{{art[ons].onaired}}</span></div>
        </div>
        <div class="righter">
            <div class="object title"><span class="divname">Title</span><span class="divcontents">{{art[ons].title}}</span></div>
            <div class="object arttype"><span class="divname">Type</span><span class="divcontents">{{art[ons].conttype}}</span></div>
            <div class="object artscale"><span class="divname">Scale</span><span class="divcontents">{{art[ons].scale}}<span class="scaletype1">分</span></span></div>
            <div class="object contents"><span class="divcontents">{{art[ons].freetext}}</span></div>
        </div>
        <div id="card-download" v-on:click="cardwrite"><i class="fas fa-file-download"></i></div>
        <div id="download-cancel" v-on:click="$emit('createcancel')">B</div>
    </main>
    `,
    mounted: function(){
        imgOptimization();
    },
    methods: {
        cardwrite(){
            const atthis = this;
            const nowtheme = atthis.darktheme;
            console.log(nowtheme);
            atthis.$emit('themechange','white');
            const main = document.getElementsByTagName("main");
            main[0].classList.add("captmode");
            const dc = document.createElement("a");
            dc.download = "canvas.png";
            html2canvas(main[0])
            .then((canvas)=>{
                canvas.crossOrigin = "Anonymous";
                dc.href = canvas.toDataURL("canvas/png");
                dc.click();
                main[0].classList.remove("captmode");
                console.log("ねえ、ここまで来てるよ");
                atthis.$emit('createcancel');
                if(nowtheme){
                    atthis.$emit('themechange','black');
                }
            })
        }
    }
});

export {creatent};