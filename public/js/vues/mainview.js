import {arttable} from "../../data/transiency-artdata.js";
import {usrsett} from "../../data/transiency-usersett.js";

import {headeralpfa} from "./header.js";
import {ArtCard} from "./artcardew.js";
import {addArtCard} from "./addArtcardew.js";
import {AsideBoard} from "./aside.js";
import {Homedent} from "./homew.js";
import {Settingent} from "./settingew.js";

// const sett2 = {
//     id:0,
//     calendDisplay: false,
//     onselect: 0,
//     username:"あめりゅ",
//     profileimg: "../images/coffee.jpg",
//     icon: "fa-hat-wizard",
//     watchtime: "150時間",
//     profiletext: "この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確にんしたいのです。",
// };


async function usrdataload(){
    return new Promise((resolve,reject)=>{
        fetch("/home/usrget",{
            method: 'POST',
        })
        .then(data => {
            resolve(data.json());
        })
        .catch(e => {
            console.error("フェッチエラー(userdata)：");
            reject(new Error(e));
        });
    })
}

async function artdataload() {
    return new Promise((resolve,reject) => {
        fetch("/home/artget",{
            method: "POST"
        })
        .then(r =>{
            resolve(r.json());
        })
        .catch(e => {
            reject(new Error(e));
        });
    })
}



const RootC = Vue.component("Rune",{
    components: {
        "home": Homedent,
        "Alluheader": headeralpfa,
        "artcardent": ArtCard,
        "asideboard": AsideBoard,
        "addartcardent": addArtCard,
        "setting": Settingent
    },
    data: function() {
        return{
            // sett: usrsett,
            ones: [arttable,usrsett.onselect],
            onselect: 0,
            addmode: true,
            displaymode: "home",
            loginmode: "login",
            usrdata: {},
            artdata: arttable,
        }
    },
    methods:{
        calenddisplaytoggle(){
            this.usrdata.calendDisplay = !(this.usrdata.calendDisplay);
        },
        countup(){
            this.nums++;
        },
        usrdataset(){
            usrdataload().then(fullfill => this.usrdata = fullfill);
        },
        artdataset(){
            artdataload().then(fullfill => this.artata = fullfill);
        },
        hometoggle(){
            this.displaymode = "home";
        },
        arttoggle(){
            this.displaymode = "art";
        },
        artentrytoggle(){
            this.displaymode = "artentry";
            this.onselect = 9999;
        },
        settoggle(){
            this.displaymode = "setting";
        }
    },
    template:`
    <div id="vue-rendering">
    <Alluheader></Alluheader>
    <div id="main-wrap">
        <home v-bind:coa="usrdata" @graphtoggle="calenddisplaytoggle" @goart="arttoggle" @artedit="artentrytoggle" @goset="settoggle" v-if="ishome"></home>
        <artcardent v-bind:art="artdata" v-bind:ons="onselect" @backhome="hometoggle" v-if="isart"></artcardent>
        <addartcardent v-bind:art="artdata" v-bind:ons="onselect" v-if="isartentry" @backhome="hometoggle"></addartcardent>
        <setting v-bind:set="usrdata" v-if="issetting" @backhome="hometoggle"></setting>
        <asideboard v-bind:artarray="artdata" v-if="!issetting"></asideboard>
        <button style="color:red;display:none;" v-on:click="usrdataset">セット</button>
    </div>
    </div>
    `,
    computed: {
        ishome(){
            return (this.displaymode == "home");
        },
        isart(){
            return (this.displaymode == "art");
        },
        isartentry(){
            return (this.displaymode == "artentry");
        },
        issetting(){
            return (this.displaymode == "setting");
        }
    },
    created: function(){
        // artload: function(){
        //     artdataload()
        //     .then(r => this.artdata = r);
        // },
            usrdataload()
            .then(r => {
                console.log(r);
                this.usrdata = r;
            })
    }
})

const Runerend = new Vue({
    el: '#wrap',
    components:{
        "Rune": RootC
    }
})




export {RootC,Runerend};