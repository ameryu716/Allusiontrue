import {imgOptimization} from "../effect/mobileImgUpload.js";

const creatent = Vue.component("CCard", {
    props:{
        art: Array,
        ons: Number,
        usrname: String,
        darktheme: Boolean
    },
    template: `
    <main id="artcardew" class="createcardew">
        <div class="lefter" style="transform:rotateZ(90deg)">
            <div class="object anime-img">
                <div id="imgprev"></div>
                <img :src="art[ons].thumbnail" id="profileimg">
            </div>
            <div class="object when"><span class="divname">When</span><i class="far fa-calendar-alt"></i><span class="divcontents">{{art[ons].sawdate}}</span></div>
            <div class="object created"><span class="divname">Created</span><span class="divcontents">{{art[ons].creater}}</span></div>
            <div class="object else written"><span class="divname">Written</span><span class="divcontents">{{usrname}}</span></div>
            <div class="object onaired"><span class="divname">Onaired</span><i class="far fa-calendar-alt"></i><span class="divcontents">{{art[ons].onaired}}</span></div>
        </div>
        <div class="righter" style="transform:rotateZ(90deg)">
            <div class="object title"><span class="divname">Title</span><span class="divcontents">{{art[ons].title}}</span></div>
            <div class="object arttype"><span class="divname">Type</span><span class="divcontents">{{art[ons].conttype}}</span></div>
            <div class="object artscale"><span class="divname">Scale</span><span class="divcontents">{{art[ons].scale}}<span class="scaletype1">分</span></span></div>
            <div class="object contents"><span class="divcontents">{{art[ons].freetext}}</span></div>
        </div>
        <div id="card-download" v-on:click="cardwrite"><i class="fas fa-file-download"></i></div>
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
                // kaiten
                
                // const c3 = document.getElementsByTagName("canvas");

                const cc3 = canvas.getContext("2d");
                cc3.save();
                cc3.translate(parseInt(360), parseInt(600)); 
                cc3.rotate( 270 * Math.PI / 180 );
                cc3.drawImage(canvas,-10,-10,800,2500,-170,-350,470,1470);
                cc3.restore();
                document.body.appendChild(canvas);

                
                cc3.drawImage(canvas,-10,-10,800,2500,-170,-350,470,1470);
                
                const c2 = document.createElement("canvas");
                c2.width = 2400;
                c2.height = 1600;
                const cc2 = c2.getContext("2d");
                cc2.drawImage(canvas,-10,-10,800,2500,0,0,1600,2400);
                document.body.appendChild(c2);


                // const cccimg = cc3.getImageData(0, 0, 500,500);
                // const newcanvas = document.createElement("canvas");
                // newcanvas.width = 1200;
                // newcanvas.height = 600;
                // const newccc = newcanvas.getContext("2d").putImageData(cccimg, 0, 0);
                // document.body.appendChild(newcanvas);


                // const c2 = document.createElement("canvas");
                // const cc3 = c2.getContext("2d");
                // cc3.drawImage(canvas,300,300);
                console.log("aaaaa");

                //kaiten
                // canvas.crossOrigin = "Anonymous";
                // dc.href = canvas.toDataURL("canvas/png");
                // dc.click();
                // main[0].classList.remove("captmode");
                // console.log("ねえ、ここまで来てるよ");
                // atthis.$emit('createcancel');
                // if(nowtheme){
                //     atthis.$emit('themechange','black');
                // }
            })
        }
    }
});

export {creatent};