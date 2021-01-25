import {imgOptimization} from "../effect/mobileImgUpload.js";


const addArtCard = Vue.component("addartcardent", {
    props:{
        art: Array,
        ons: Number
    },
    template: `
    <main id="addartcardew" class="artcardew">
        <form action="/artentry" method="POST" id="artentry">
        <!--  <div class="di-back" v-on:><i class="fas fa-arrow-left backicon"></i></div> -->
            
            <div class="object title">
                <span class="divname">Title</span>
                <input :value="art[ons].title" class="divcontents" type="text" name="title" v-if="!isnewedit">
                <input class="divcontents" type="text" name="title" v-if="isnewedit" placeholder="タイトル...">
            </div>

                <div class="object anime-img">
                    <div id="imgprev"></div>
                    <label for="imguploads" id="uploadlabel">
                        <i class="fas fa-images imageicon"></i>
                        <i class="fas fa-plus imageplus-icon"></i>
                        <input type="file" name="imguploads" id="imguploads" accept="image/*">
                        <input type="text" name="artimgsrc" id="artimgsrc" hidden>
                    </label>
                    <img :src="art[ons].thumbnail" id="profileimg" v-if="!isnewedit">
                    <img src="" id="profileimg" v-if="isnewedit">
                </div>

                <div class="object when">
                    <span class="divname">When</span><i class="far fa-calendar-alt"></i>
                    <input :value="art[ons].sawdate" class="divcontents" type="date" name="when" v-if="!isnewedit">
                    <input class="divcontents" type="date" name="when" v-if="isnewedit" >
                </div>

                <div class="object onaired">
                    <span class="divname">Onaired</span><i class="far fa-calendar-alt"></i>
                    <input :value="art[ons].onaired" class="divcontents" type="date" name="onaired" v-if="!isnewedit">
                    <input class="divcontents" type="date" name="onaired" v-if="isnewedit">
                </div>

                <div class="object created">
                    <span class="divname">Created</span>
                    <input :value="art[ons].creater" class="divcontents" type="text" name="created" v-if="!isnewedit">
                    <input class="divcontents" type="text" name="created" v-if="isnewedit" placeholder="制作者...">
                </div>

                <div class="object arttype">
                    <span class="divname">Type</span>
                    <input :value="art[ons].conttype" class="divcontents" type="text" name="arttype" v-if="!isnewedit">
                    <input class="divcontents" type="text" name="arttype" v-if="isnewedit" list="arttype" placeholder="形態...">
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
                    <textarea class="divcontents" name="ftxt" v-if="isnewedit" placeholder="かっこいいしかわいいしマジ最高..."></textarea>
                </div>

            <input type="hidden" name="editid" id="editid" :value=art[ons].id v-if="!isnewedit">
            <input type="hidden" name="editmode" id="editmode" :value=ons>
            <input type="submit" class="crudbtn" id="ca-btn" value="やめる" v-if="!isnewedit">
            <button @click="$emit('backhome')" class="backbtn">戻る</button>
            <input type="submit" class="crudbtn" id="c-btn" value="登録">
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
    },
    created: function(){
        window.addEventListener("load",()=>{
            document.body.style.height = "100%";
            document.getElementById("wrap").style.height = "100%";
            document.getElementById("artentry").addEventListener('blur', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        })
    },
    // destroyed: function(){
    //     document.body.style.height = "100%";
    //     document.getElementById("wrap").style.height = "100%";
    // }
});

export {addArtCard};