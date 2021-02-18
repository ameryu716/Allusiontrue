import {selfer} from "./selfFieldew.js";

const Homedent = Vue.component("home",{
    components: {
        "Selfer": selfer
    },
    props:{
        coa: Object,
        dself: String,
        artdata: Array
    },
    template:`
    <main id="homew">
        <div class="name">
            <img :src="coa.profileimg">
            <span>{{coa.username}}</span>
        </div>
        <div class="status">
            <div><i class="fas awefon fa-fw" :class="coa.icon"></i><span>Magier</span></div>
            <div v-on:click="$emit('graphtoggle')">
                <i class="far fa-calendar-alt"></i>
                <i class="fas fa-arrows-alt-h"></i>
                <i class="fas fa-chart-line"></i>
            </div>
            <div><i class="fas fa-chart-pie awefon fa-fw"></i><span>{{this.minites}}</span>h</div>
        </div>
        <Selfer v-bind:disp="dself" v-bind:selfobj="coa" v-bind:artdata="artdata"></Selfer>
        <div class="move">
            <ul>
                <ol v-on:click="$emit('artedit')"><i class="fas fa-pen awefon fa-fw"></i>記録する</ol>
                <ol v-on:click="$emit('cardcreate')"><i class="fas fa-plus awefon fa-fw"></i>カードを作成する</ol>
                <ol><i class="fas fa-wrench awefon fa-fw"></i>調整する</ol>
            </ul>
        </div>
        <div class="option" v-on:click="$emit('goset')">
            <i class="fas fa-cog"></i>
        </div>
    </main>
    `,
    computed: {
        minites(){
            return Math.round((this.coa.watchtime/60) * 10) / 10;
        }
    }
});


export {Homedent};