const ArtCard = Vue.component("artcardent", {
    props:{
        val: Array,
    },
    template: `
    <main id="artcardew">
        <div class="lefter">
            <div class="object anime-img">
                <label for="imguploads" id="uploadlabel">
                    <i class="fas fa-images imageicon"></i>
                    <i class="fas fa-plus imageplus-icon"></i>
                    <input type="file" name="imguploads" id="imguploads" accept="image/*">
                </label>
                <img :src="val[0][val[1]].thumbnail" id="profileimg">
            </div>
            <div class="object when"><span class="divname">When</span><i class="far fa-calendar-alt"></i><span class="divcontents">{{val[0][val[1]].sawdate}}</span></div>
            <div class="object created"><span class="divname">Created</span><span class="divcontents">{{val[0][val[1]].creater}}</span></div>
            <div class="object else pageout"><i class="fas fa-sign-in-alt"></i></div>
            <div class="object onaired"><span class="divname">Onaired</span><span class="divcontents">{{val[0][val[1]].onaired}}</span></div>
        </div>
        <div class="righter">
            <div class="object title"><span class="divname">Title</span><span class="divcontents">{{val[0][val[1]].title}}</span></div>
            <div class="object arttype"><span class="divname">Type</span><span class="divcontents">{{val[0][val[1]].conttype}}</span></div>
            <div class="object artscale"><span class="divname">Scale</span><span class="divcontents">{{val[0][val[1]].scale}}</span></div>
            <div class="object contents"><span class="divcontents">{{val[0][val[1]].freetext}}</span></div>
        </div>
    </main>
    `,
});

export {ArtCard};

// //return{
//     keys:0,
//     ef: usertable
// }