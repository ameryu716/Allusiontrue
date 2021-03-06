import {headeralpfa} from "./header.js";
import {ArtCard} from "./artcardew.js";
import {addArtCard} from "./addArtcardew.js";
import {AsideBoard} from "./aside.js";
import {Homedent} from "./homew.js";
import {Settingent} from "./settingew.js";
import {creatent} from "./createcardew.js";
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
        "setting": Settingent,
        "CCard": creatent,
    },
    data: function() {
        return{
            onselect: 0,
            addmode: true,
            displaymode: "home",
            selfdisp: "text",
            loginmode: "logout",
            darktheme: true,
            createmode: false,
            usrdata: {},
            artdata: [],
        }
    },
    methods:{
        calenddisplaytoggle(){
            this.usrdata.calendDisplay = !(this.usrdata.calendDisplay);
        },
        selfDispRotate(){
            switch(this.selfdisp){
                case "text":
                    this.selfdisp = "graph";
                    break;
                case "graph":
                    this.selfdisp = "text";
                    break;
                default:
                    throw new Error();
            }
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
        darkthemetoggle(color){
            if(color !== undefined){
                switch(color){
                    case "white":
                        document.getElementById("wrap").style.backgroundColor ="#fff";
                        this.darktheme = false;
                        break;
                    case "black":
                        document.getElementById("wrap").style.backgroundColor ="rgba(0,0,0,0.7)";
                        this.darktheme = true;
                        break;
                }
            }else if(color == undefined){
                if(!this.darktheme){
                    document.getElementById("wrap").style.backgroundColor ="rgba(0,0,0,0.7)";
                    this.darktheme = true;
                }else{
                    document.getElementById("wrap").style.backgroundColor = "#fff";
                    this.darktheme = false;
                }
            }
        },
        listSelectArt(snum){
            if(!this.createmode){
                this.onselect = snum;
                this.displaymode = "art";
            }else{
                this.onselect = snum;
                this.displaymode = "create";
            }
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
        },
        sorting(){
            const sortoption = document.getElementsByClassName('filter-option')[0].value;
            console.log(sortoption);
            if(sortoption == "視聴日時順"){
                this.artdata.sort(function(a,b){
                    if(a.sawdate < b.sawdate){
                        return -1;
                    }else{
                        return 1;
                    }
                })
            }else if(sortoption == "50音順"){
                this.artdata.sort(function(a,b){
                    if(a.title < b.title){
                        return -1;
                    }else{
                        return 1;
                    }
                })
            }
        },
        cardCreateRun(){
            this.createmode = true;
        },
        createcancel(){
            if(this.createmode){
                this.createmode = false;
                this.displaymode = "home";
                homeelement.onclick = undefined;
            }
        }
    },
    template:`
    <div id="vue-rendering" v-bind:class="vuerendclass">
        <Alluheader v-bind:login="loginmode"></Alluheader>
        <div id="main-wrap">
            <button id="cancelbtn" v-if="isCreateAndHome" @click="createcancel">やめる</button>
            
            <home v-bind:coa="usrdata"
             v-bind:dself="selfdisp" 
             v-bind:artdata="artdata"
             @graphtoggle="selfDispRotate" 
             @goart="arttoggle" 
             @artedit="artentrytoggle" 
             @goset="settoggle" 
             @cardcreate="cardCreateRun"
             v-if="ishome">
            </home>

            <artcardent v-bind:art="artdata" v-bind:ons="onselect" @backhome="hometoggle" @artDelete="artDelete" @artUpdate="artUpdate" v-if="isart"></artcardent>
            <addartcardent v-bind:art="artdata" v-bind:ons="onselect" @backhome="hometoggle" v-if="isartentry"></addartcardent>
            <setting v-bind:set="usrdata" v-if="issetting" @backhome="hometoggle" @themechange="darkthemetoggle"></setting>

            <CCard v-bind:art="artdata"
             v-bind:ons="onselect" 
             v-bind:usrname="usrdata.username"
             v-bind:darktheme="darktheme"
             @themechange="darkthemetoggle($event)" 
             @createcancel="createcancel" 
             v-if="isCCard">
            </CCard>

            <asideboard
             v-bind:artarray="artdata" 
             v-bind:ons="onselect"
             v-if="!issetting" 
             @selectart="listSelectArt($event)" 
             @filtselect="sorting">
            </asideboard>
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
        isCCard(){
            return (this.displaymode == "create")
        },
        isCreateAndHome(){
            return this.createmode&&this.ishome;
        },
        vuerendclass(){
            return {
                darktheme: this.darktheme,
                createmode: this.createmode
            }
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

const homeelement = document.getElementById("homew");

export {RootC,Runerend};