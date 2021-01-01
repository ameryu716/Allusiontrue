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

async function artDelete(id){
    const formdata = new FormData();
    const id_str = String(id);
    formdata.append("artid",id_str);
    formdata.set("test","erty");
    console.log(id_str);
    console.log(typeof id_str);
    return new Promise((resolve,reject) => {
        fetch("/artdelete",{
            method: "POST",
            body: formdata
        })
        .then(()=>{
            resolve();
        })
        .catch(e =>{
            reject(e)
        })
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
            darktheme: false,
            usrdata: {},
            artdata: [],
        }
    },
    methods:{
        calenddisplaytoggle(){
            this.usrdata.calendDisplay = !(this.usrdata.calendDisplay);
        },
        usrdataset(){
            usrdataload().then(fullfill => this.usrdata = fullfill);
        },
        artdataset(){
            artdataload().then(fullfill => this.artdata = fullfill);
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
        darkthemetoggle(){
            if(!this.darktheme){
                document.getElementById("wrap").style.backgroundColor ="rgba(0,0,0,0.7)";
            }else{
                document.getElementById("wrap").style.backgroundColor = "#fff";
            }
            this.darktheme = !this.darktheme;
        },
        listSelectArt(snum){
            this.onselect = snum;
            this.displaymode = "art";
        },
        artUpdate(){
            this.displaymode = "artentry";
        },
        artDelete(){
            artDelete(this.artdata[this.onselect].id)
            .then(() => {
                this.hometoggle();
            })
            .then(()=> artdataload())
            .then(r => {
                if(r == null){
                    return;
                }
                console.log("art:"+r);
                this.artdata = r;
                for(let i=0; i<r.length; i++){
                    imgLoad(this.artdata[i].thumbnail)
                    .then(r => {
                        this.artdata[i].thumbnail = r;
                    })
                }
            })
        }
    },
    template:`
    <div id="vue-rendering" v-bind:class="{darktheme:darktheme}">
    <Alluheader v-bind:login="loginmode"></Alluheader>
    <div id="main-wrap">
        <home v-bind:coa="usrdata" @graphtoggle="calenddisplaytoggle" @goart="arttoggle" @artedit="artentrytoggle" @goset="settoggle" v-if="ishome"></home>
        <artcardent v-bind:art="artdata" v-bind:ons="onselect" @backhome="hometoggle" @artDelete="artDelete" @artUpdate="artUpdate" v-if="isart"></artcardent>
        <addartcardent v-bind:art="artdata" v-bind:ons="onselect" @backhome="hometoggle" v-if="isartentry"></addartcardent>
        <setting v-bind:set="usrdata" v-if="issetting" @backhome="hometoggle" @themechange="darkthemetoggle"></setting>
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
        },
    },
    mounted: function(){
        setTimeout(() => {
            let rtime = 0;
            for(let i=0;i<this.artdata.length;i++){
                rtime = rtime + this.artdata[i].scale;
            }
            this.usrdata.watchtime = rtime;
        }, 1000);
    },
    created: function(){
        artdataload().then(r => {
            //console.log("art:"+r);
            this.artdata = r;
            for(let i=0; i<r.length; i++){
                imgLoad(this.artdata[i].thumbnail)
                .then(r => {
                    this.artdata[i].thumbnail = r;
                })
            }
        }),
        usrdataload().then(r => {
            //console.log("usr"+r);
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