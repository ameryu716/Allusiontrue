import {headeralpfa} from "./mobileHeader.js";
import {ArtCard} from "./mobileArtcardew.js";
import {addArtCard} from "./mobileAddArtcardew.js";
import {AsideBoard} from "./mobileAside.js";
import {Homedent} from "./mobileHomew.js";
import {Settingent} from "./mobileSettingew.js";
import {creatent} from "./mobileCreatecardew.js";
import {Mastertool} from "./mobileMastertool.js";
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
            // console.error("フェッチエラー(userdata)："+e);
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
            // console.error("フェッチエラー(artdata)："+e);
            reject(new Error(e));
        });
    })
}

async function artDelete(id){
    const formdata = new FormData();
    const id_str = String(id);
    formdata.append("artid",id_str);
    formdata.set("test","erty");
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

const backfunc = function(func){
    history.pushState(null, null, null);
    window.addEventListener("popstate",()=>{
        func();
        history.pushState(null, null, null);
        return;
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
        "Mastertool": Mastertool
    },
    data: function() {
        return{
            onselect: 0,
            // addmode: true,
            displaymode: "list",
            selfdisp: "text",
            loginmode: "logout",
            tools: false,
            darktheme: true,
            createmode: false,
            sharemode: true,
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
                    this.selfdisp = "calend";
                    break;
                case "calend":
                    this.selfdisp = "graph";
                    break;
                case "graph":
                    this.selfdisp = "text";
                    break;
                default:
                    throw new Error();
            }
        },
        // usrdataset(){
        //     usrdataload().then(fullfill => this.usrdata = fullfill);
        // },
        // artdataset(){
        //     artdataload().then(fullfill => this.artdata = fullfill);
        // },
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
        listtoggle(){
            this.displaymode = "list";
            this.createmode = false;
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
                this.listtoggle();
            })
            .then(()=> artdataload())
            .then(r => {
                if(r == null){
                    return;
                }
                // console.log("art:"+r);
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
            // console.log(sortoption);
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
        cardCreateRun(args){
            if(args == "share"){
                this.sharemode = true;
            }
            if(args == "save"){
                this.sharemode = false;
            }
            this.createmode = true;
        },
        createcancel(){
            if(this.createmode){
                this.createmode = false;
                this.listtoggle();
            }
        },
        toolstoggle(){
            this.tools = !this.tools;
        }
    },
    template:`
    <div id="vue-rendering" v-bind:class="vuerendclass">
        <!-- <Alluheader v-bind:login="loginmode" v-if="!iscardew"></Alluheader> -->
        <div id="main-wrap" v-bind:class="mainwrappadd">
            <!-- <button id="cancelbtn" v-if="isCreateAndHome" @click="createcancel">やめる</button> -->
            
            <home v-bind:coa="usrdata"
             v-bind:dself="selfdisp" 
             @graphtoggle="selfDispRotate" 
             @goart="arttoggle" 
             @artedit="artentrytoggle" 
             @goset="settoggle" 
             @cardcreate="cardCreateRun"
             v-if="ishome">
            </home>

            <artcardent
             v-bind:art="artdata" 
             v-bind:ons="onselect" 
             @backhome="listtoggle" 
             @artDelete="artDelete" 
             @artUpdate="artUpdate" 
             v-if="isart">
            </artcardent>
            
            <addartcardent
             v-bind:art="artdata" 
             v-bind:ons="onselect" 
             @backhome="listtoggle" 
             v-if="isartentry">
            </addartcardent>

            <setting
             v-bind:set="usrdata" 
             v-if="issetting" 
             @backhome="hometoggle" 
             @themechange="darkthemetoggle">
            </setting>

            <CCard v-bind:art="artdata"
             v-bind:ons="onselect" 
             v-bind:usrname="usrdata.username"
             v-bind:darktheme="darktheme"
             v-bind:sharemode="sharemode"
             @themechange="darkthemetoggle($event)" 
             @createcancel="createcancel" 
             v-if="isCCard">
            </CCard>

            <asideboard
             v-bind:artarray="artdata" 
             v-bind:ons="onselect"
             v-bind:usrset="usrdata"
             v-if="islist"
             @selectart="listSelectArt($event)" 
             @filtselect="sorting">
            </asideboard>

            <div class="mobiletools" v-if="islist">
                <button id="operator" @click="artentrytoggle"><i class="fas fa-plus"></i></button>
                <div v-if="createmode" class="sharenav">
                    <i class="far fa-comment-dots"></i><p class="share-p">どれを共有しますか？</p>
                </div>
            </div>

            <Mastertool
             @letset="settoggle"
             @backhome="listtoggle"
             @cardCreateRun="cardCreateRun"
             v-if="necetool">
            </Mastertool>

        </div>
    </div>
    `,
    computed: {
        ishome(){
            return this.displaymode == "home";
        },
        isart(){
            return this.displaymode == "art";
        },
        isartentry(){
            return this.displaymode == "artentry";
        },
        issetting(){
            return this.displaymode == "setting";
        },
        isCCard(){
            return this.displaymode == "create";
        },
        islist(){
            return this.displaymode == "list";
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
        mainwrappadd(){
            return {
                onspace: this.islist||this.issetting||this.isCCard,
                nonspace: this.isart||this.isartentry
            }
        },
        iscardew(){
            return this.isart||this.isartentry||this.isCCard;
        },
        necetool(){
            return !(this.isart||this.isartentry);
        }
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
        }),
        backfunc(this.listtoggle());
    }
})

const Runerend = new Vue({
    el: '#wrap',
    components:{
        "Rune": RootC
    }
})

export {RootC,Runerend};