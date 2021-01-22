import {imgOptimization} from "../effect/imgUpload.js";

const ArtCard = Vue.component("artcardent", {
    props:{
        art: Array,
        ons: Number
    },
    template: `
    <main id="artcardew" class="artcardew">
        <div class="di-back" v-on:click="$emit('backhome')"><i class="fas fa-arrow-left backicon"></i></div>
        <div class="lefter">
            <div class="object anime-img">
                <div id="imgprev"></div>
                <label for="imguploads" id="uploadlabel">
                    <i class="fas fa-images imageicon"></i>
                    <i class="fas fa-plus imageplus-icon"></i>
                    <input type="file" name="imguploads" id="imguploads" accept="image/*">
                    <input type="text" name="artimgsrc" id="artimgsrc" hidden>
                </label>
                <img :src="art[ons].thumbnail" id="profileimg">
            </div>
            <div class="object when"><span class="divname">When</span><i class="far fa-calendar-alt"></i><span class="divcontents">{{art[ons].sawdate}}</span></div>
            <div class="object created"><span class="divname">Created</span><span class="divcontents">{{art[ons].creater}}</span></div>
            <div class="object else pageout"><i class="fas fa-sign-in-alt"></i></div>
            <div class="object onaired"><span class="divname">Onaired</span><span class="divcontents">{{art[ons].onaired}}</span></div>
        </div>
        <div class="righter">
            <div class="object title"><span class="divname">Title</span><span class="divcontents">{{art[ons].title}}</span></div>
            <div class="object arttype"><span class="divname">Type</span><span class="divcontents">{{art[ons].conttype}}</span></div>
            <div class="object artscale"><span class="divname">Scale</span><span class="divcontents">{{art[ons].scale}}<span class="scaletype1">分</span></span></div>
            <div class="object contents"><span class="divcontents">{{art[ons].freetext}}</span></div>
        </div>
        <input type="submit" class="crudbtn" id="u-btn" v-on:click="$emit('artUpdate')" value="編集">
        <input type="button" class="crudbtn" id="d-btn" v-on:click="$emit('artDelete')" value="削除">
    </main>
    `,
    mounted: function(){
        imgOptimization();
    }
});

export {ArtCard};