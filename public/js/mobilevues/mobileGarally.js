const onegarallynent = Vue.component("Garally",{
    props: {
        onecard: Object,
        index: Number
    },
    template: `
    <li class="garallycard" v-on:click="$emit('selectart',index)">
        <div class="garally-img-board">
            <img :src="onecard.thumbnail" class="garally-sumbnail">
        </div>
        <div class="garally-cnt-board">
            <div class="garally-title-board">
                <div class="garally-title-board-title">
                    <span>{{onecard.title}}</span>
                </div>
                <span class="garally-date">{{onecard.sawdate}}</span>
            </div>
            <div class="garally-card-content">
                {{onecard.scale}}<span>分</span>
            </div>
        </div>
    </li> `
})


export {onegarallynent};