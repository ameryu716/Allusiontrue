import {imgOptimization} from "../effect/imgUpload.js";


const addArtCard = Vue.component("addartcardent", {
    props:{
        art: Array,
        ons: Number
    },
    template: `
    <main id="artcardew">
        <form action="/home/artentry" method="POST" id="artentry">
            <div class="di-back" v-on:click="$emit('backhome')"><i class="fas fa-arrow-left backicon"></i></div>
            <div class="lefter">
                <div class="object anime-img">
                    <label for="imguploads" id="uploadlabel">
                        <i class="fas fa-images imageicon"></i>
                        <i class="fas fa-plus imageplus-icon"></i>
                        <input type="file" name="imguploads" id="imguploads" accept="image/*">
                    </label>
                    <img :src="art[ons].thumbnail" id="profileimg" v-if="!isnewedit">
                    <img src="" id="profileimg" v-if="isnewedit">
                </div>
                <div class="object when">
                    <span class="divname">When</span><i class="far fa-calendar-alt"></i>
                    <input :value="art[ons].sawdate" class="divcontents" type="date" name="when" v-if="!isnewedit">
                    <input class="divcontents" type="date" name="when" v-if="isnewedit" >
                    
                </div>
                <div class="object created">
                    <span class="divname">Created</span>
                    <input :value="art[ons].creater" class="divcontents" type="text" name="created" v-if="!isnewedit">
                    <input class="divcontents" type="text" name="created" v-if="isnewedit">
                </div>
                <div class="object else pageout"></div>
                <div class="object onaired">
                    <span class="divname">Onaired</span>
                    <input :value="art[ons].onaired" class="divcontents" type="text" name="onaired" v-if="!isnewedit">
                    <input class="divcontents" type="date" name="onaired" v-if="isnewedit">
                </div>
            </div>
            <div class="righter">
                <div class="object title">
                    <span class="divname">Title</span>
                    <input :value="art[ons].title" class="divcontents" type="text" name="title" v-if="!isnewedit">
                    <input class="divcontents" type="text" name="title" v-if="isnewedit">
                </div>
                <div class="object arttype">
                    <span class="divname">Type</span>
                    <input :value="art[ons].conttype" class="divcontents" type="text" name="arttype" v-if="!isnewedit">
                    <input class="divcontents" type="text" name="arttype" v-if="isnewedit" list="arttype">
                    <datalist id="arttype">
                        <option value="TVアニメ"></option>
                        <option value="映画"></option>
                        <option value="動画"></option>
                        <option value="小説"></option>
                    </datalist>
                </div>
                <div class="object artscale">
                    <span class="divname">Scale</span>
                    <input :value="art[ons].scale" class="divcontents" type="number" name="artscale" v-if="!isnewedit">
                    <input class="divcontents" type="number" name="artscale" v-if="isnewedit"><span class="scaletype">分</span>
                </div>
                <div class="object contents">
                    <span class="divname">Text</span>
                    <textarea :value="art[ons].freetext" class="divcontents" name="ftxt" v-if="!isnewedit"></textarea>
                    <textarea class="divcontents" name="ftxt" v-if="isnewedit"></textarea>
                </div>
            </div>
            <input type="submit" id="d-btn" value="登録">
        </form>
    </main>
    `,
    mounted: function(){
        imgOptimization();
    },
    computed: {
        isnewedit(){
            return (this.ons === 9999);
        }
    }
});

export {addArtCard};

// //return{
//     keys:0,
//     ef: usertable
// }