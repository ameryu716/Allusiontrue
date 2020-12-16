const addArtCard = Vue.component("addartcardent", {
    props:{
        artinfo: Array,
    },
    template: `
    <main id="artcardew">
        <form action="/artentry" method="POST" id="artentry">
            <div class="di-back" v-on:click="$emit('backhome')"><i class="fas fa-arrow-left backicon"></i></div>
            <div class="lefter">
                <div class="object anime-img">
                    <label for="imguploads" id="uploadlabel">
                        <i class="fas fa-images imageicon"></i>
                        <i class="fas fa-plus imageplus-icon"></i>
                        <input type="file" name="imguploads" id="imguploads" accept="image/*">
                    </label>
                    <img :src="artinfo[0][artinfo[1]].thumbnail" id="profileimg">
                </div>
                <div class="object when"><span class="divname">When</span><i class="far fa-calendar-alt"></i><input :value="artinfo[0][artinfo[1]].sawdate" class="divcontents" type="date" name="when"></div>
                <div class="object created"><span class="divname">Created</span><input :value="artinfo[0][artinfo[1]].creater" class="divcontents" type="text" name="created"></div>
                <div class="object else pageout"><i class="fas fa-sign-in-alt"></i></div>
                <div class="object onaired"><span class="divname">Onaired</span><input :value="artinfo[0][artinfo[1]].onaired" class="divcontents" type="text" name="onaired"></div>
            </div>
            <div class="righter">
                <div class="object title"><span class="divname">Title</span><input :value="artinfo[0][artinfo[1]].title" class="divcontents" type="text" name="title"></div>
                <div class="object arttype"><span class="divname">Type</span><input :value="artinfo[0][artinfo[1]].conttype" class="divcontents" type="text" name="arttype"></div>
                <div class="object artscale"><span class="divname">Scale</span><input :value="artinfo[0][artinfo[1]].scale" class="divcontents" type="number" name="artscale"></div>
                <div class="object contents"><span class="divname">Text</span><textarea :value="artinfo[0][artinfo[1]].freetext" class="divcontents" name="ftxt"></textarea></div>
            </div>
            <input type="submit" id="d-btn" value="決定">
        </form>
    </main>
    `,
    method: {

    }
});

export {addArtCard};

// //return{
//     keys:0,
//     ef: usertable
// }