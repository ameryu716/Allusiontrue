import {headeralpfa} from "./header.js";
import {ArtCard} from "./artcardew.js";
import {addArtCard} from "./addArtcardew.js";
import {AsideBoard} from "./aside.js";
import {Homedent} from "./homew.js";
import {Settingent} from "./settingew.js";
import {imgLoad} from "../effect/imgLocalIndex.js";

async function usrdataload(){
    return new Promise((resolve,reject)=>{
        fetch("/usrget",{
            method: 'POST',
        })
        .then(data => {
            resolve(data.json());
        })
        .catch(e => {
            console.error("フェッチエラー(userdata)："+e);
            reject(new Error(e));
        });
    })
}

async function artdataload() {
    return new Promise((resolve,reject) => {
        fetch("/artget",{
            method: "POST"
        })
        .then(artdata =>{
            resolve(artdata.json());
        })
        .catch(e => {
            console.error("フェッチエラー(artdata)："+e);
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
            onselect: 0,
            addmode: true,
            displaymode: "home",
            loginmode: "logout",
            usrdata: {},
            artdata: [],
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
        },
        listSelectArt(snum){
            this.onselect = snum;
            this.displaymode = "art";
        }
    },
    template:`
    <div id="vue-rendering">
    <Alluheader v-bind:login="loginmode"></Alluheader>
    <div id="main-wrap">
        <home v-bind:coa="usrdata" @graphtoggle="calenddisplaytoggle" @goart="arttoggle" @artedit="artentrytoggle" @goset="settoggle" v-if="ishome"></home>
        <artcardent v-bind:art="artdata" v-bind:ons="onselect" @backhome="hometoggle" v-if="isart"></artcardent>
        <addartcardent v-bind:art="artdata" v-bind:ons="onselect" v-if="isartentry" @backhome="hometoggle"></addartcardent>
        <setting v-bind:set="usrdata" v-if="issetting" @backhome="hometoggle"></setting>
        <asideboard v-bind:artarray="artdata" v-bind:ons="onselect" v-if="!issetting" @selectart="listSelectArt($event)"></asideboard>
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
    created(){
        artdataload().then(r => {
            console.log("art:"+r);
            this.artdata = r;
            for(let i=0; i<r.length; i++){
                imgLoad(this.artdata[i].thumbnail)
                .then(r => {
                    this.artdata[i].thumbnail = r;
                })
            }
        }),
        usrdataload().then(r => {
            console.log("usr"+r);
            this.usrdata = r;
            imgLoad(this.usrdata.profileimg)
            .then(r => {
                this.usrdata.profileimg = r;
            });
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