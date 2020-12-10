import {headeralpfa} from "./header.js";
import {usertable} from "../../data/database-sample.js";
import {sett} from "../../data/usersett.js"
import {ArtCard} from "./artcardew.js";
import {AsideBoard} from "./aside.js";
import {Homedent} from "./homew.js";

const cry = new Vue({
    name:"Rune",
    el: '#wrap',
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
})

export {cry};