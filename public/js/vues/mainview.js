import {usertable} from "../../data/transiency-artdata.js";
import {sett} from "../../data/transiency-usersett.js"
import {headeralpfa} from "./header.js";
import {ArtCard} from "./artcardew.js";
import {AsideBoard} from "./aside.js";
import {Homedent} from "./homew.js";

const RootC = Vue.component("Rune",{
    components: {
        "home": Homedent,
        "Alluheader": headeralpfa,
        "artcardent": ArtCard,
        "asideboard": AsideBoard,
    },
    data: function() {
        return{
            sett: sett,
            ones: [usertable,sett.onselect],
            nums: 0,
        }
    },
    methods:{
        calenddisplaytoggle(){
            this.sett.calendDisplay = !(this.sett.calendDisplay);
        },
        countup(){
            this.nums++;
        }
    },
    template:`
    <div id="vue-rendering">
    <Alluheader></Alluheader>
    <div id="main-wrap">
        <home v-bind:coa="sett" @graphtoggle="calenddisplaytoggle" v-if="sett.calendDisplay"></home>
        <artcardent v-bind:val="ones" v-else></artcardent>
        <asideboard v-bind:don="ones"></asideboard>
    </div>
    </div>
    `
})

const Runerend = new Vue({
    el: '#wrap',
    components:{
        "Rune": RootC
    }
})

export {RootC,Runerend};