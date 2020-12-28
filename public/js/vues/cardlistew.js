const onecardnent = Vue.component("minicard",{
    props: {
        onecard: Object,
        index: Number
    },
    template: `
    <li class="animecard" v-on:click="$emit('selectart',index)">
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
                {{onecard.scale}}<span>分</span>
            </div>
        </div>
    </li> `
})


export {onecardnent};