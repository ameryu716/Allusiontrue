import {imgOptimization} from "../effect/mobileImgUpload.js";

const creatent = Vue.component("CCard", {
    props:{
        art: Array,
        ons: Number,
        usrname: String,
        darktheme: Boolean,
        sharemode: Boolean
    },
    template: `
    <main id="artcardew" class="createcardew">
        <div class="lefter" style="transform:rotateZ(90deg)">
            <div class="object anime-img">
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
        <div id="card-download" v-on:click="cardwrite">OK!</div>
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
            const randomStr5 = String(Math.floor(Math.random()*99999)+1).substr(0,5);//ランダム5
            
            html2canvas(main[0])
            .then((canvas)=>{
                // kaiten
                function canvasRotate270(img){
                    const canvas = document.createElement('canvas');
                    canvas.width = img.height;
                    canvas.height = img.width;
                    //反転canvas生成
                    const ctx = canvas.getContext('2d');
                
                    ctx.save();
                    ctx.translate(0,canvas.height);
                    ctx.rotate( 270 * Math.PI / 180 );
                    ctx.drawImage(img, 0, 0,canvas.height,canvas.width,0,0,canvas.height,canvas.width);
                    ctx.restore();
                    return canvas;
                }

                const newcanvas = canvasRotate270(canvas);
                newcanvas.crossOrigin = "Anonymous";
                // dc.href = newcanvas.toDataURL("canvas/png");
                if(!this.sharemode){
                    //保存
                    const dc = document.createElement("a");
                    dc.download = "allusion"+randomStr5+".png";
                    dc.href = newcanvas.toDataURL("allusion"+randomStr5+"/png");
                    dc.click();
                }else{
                    //共有
                    newcanvas.toBlob((blob) => {
                        const shareImg = new File([blob], randomStr5+'.png', {type: 'image/png'})
                        navigator.share({
                            title: 'アニメ紹介カード',
                            text: '私のおすすめアニメです。 #アニメ紹介カード',
                            url: 'http://allusion3.herokuapp.com',
                            files: [shareImg]
                        })
                        .then(() => {
                            // シェアしたら実行される
                        })
                        .catch((error) => {
                            // シェアせず終了した場合もここに入ってくる。
                            alert("無理です....");
                        });
                    })
                    .catch(e => alert("無理です...."));
                }
                
                main[0].classList.remove("captmode");
                atthis.$emit('createcancel');
                if(nowtheme){
                    atthis.$emit('themechange','black');
                }
            })
        }
    }
});

export {creatent};