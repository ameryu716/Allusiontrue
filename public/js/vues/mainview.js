import {arttable} from "../../data/transiency-artdata.js";
import {usrsett} from "../../data/transiency-usersett.js";

import {headeralpfa} from "./header.js";
import {ArtCard} from "./artcardew.js";
import {addArtCard} from "./addArtcardew.js";
import {AsideBoard} from "./aside.js";
import {Homedent} from "./homew.js";

const sett2 = {
    id:0,
    calendDisplay: false,
    onselect: 0,
    username:"あめりゅ",
    profileimg: "../images/coffee.jpg",
    icon: "fa-hat-wizard",
    watchtime: "150時間",
    profiletext: "この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています。この文章はダミーです。文字の大きさ、量、字間、行間等を確にんしたいのです。",
};


async function usrdataload(){
    return new Promise((resolve,reject)=>{
        fetch("../../data/testdata.json",{
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            console.log(data.calendDisplay);
            resolve(data);
        })
        .catch(e => {
            console.error("フェッチエラー(userdata)：");
            reject(new Error(e));
        });
    })
}

async function artdataload() {
    return new Promise((resolve,reject) => {
        fetch("../../data/artdata.json",{
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            resolve(data);
        })
        .catch(e => {
            console.log("フェッチエラー(artdata)");
            reject(new Error(e));
        })
    })
}


const RootC = Vue.component("Rune",{
    props: {
        usrdata: Object,
        artdata: Object
    },
    components: {
        "home": Homedent,
        "Alluheader": headeralpfa,
        "artcardent": ArtCard,
        "asideboard": AsideBoard,
        "addartcardent": addArtCard
    },
    data: function() {
        return{
            sett: usrsett,
            ones: [arttable,usrsett.onselect],
            addmode: true,
            displaymode: "home",
            loginmode: "login"
        }
    },
    methods:{
        calenddisplaytoggle(){
            this.sett.calendDisplay = !(this.sett.calendDisplay);
        },
        countup(){
            this.nums++;
        },
        usrdataset(){
            usrdataload().then(fullfill => this.sett = fullfill);
        },
        artdataset(){
            artdataload().then(fullfill => this.ones[0] = fullfill);
        },
        hometoggle(){
            this.displaymode = "home";
        },
        arttoggle(){

            this.displaymode = "art";
        }
    },
    template:`
    <div id="vue-rendering">
    <Alluheader></Alluheader>
    <div id="main-wrap">
        <home v-bind:coa="sett" @graphtoggle="calenddisplaytoggle" @goart="arttoggle" v-if="ishome"></home>
        <artcardent v-bind:val="ones" @backhome="hometoggle" v-if="isart"></artcardent>
        <addartcardent v-bind:artinfo="ones" v-if="isartentry" @backhome="hometoggle"></addartcardent>
        <asideboard v-bind:don="ones"></asideboard>
        <button style="color:red;display:none;" v-on:click="usrdataset" >セット</button>
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
        }
    }
})

const Runerend = new Vue({
    el: '#wrap',
    components:{
        "Rune": RootC
    }
})




export {RootC,Runerend};