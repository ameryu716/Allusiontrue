import {onecardnent} from "./mobileCardlistew.js";
import {onegarallynent} from "./mobileGarally.js";
import {aheadEffect} from "../effect/asideheaderEf.js";

const AsideBoard = Vue.component("asideboard", {
    props:{
        artarray: Array,
        ons: Number,
        usrset: Object
    },
    data: function(){
        return{
            onecard: this.artarray,
            status: false,
            list: true
        }
    }, 
    template: `
    <aside id="cardlist">
        <div class="asideheader">
            <div id="statuslist" v-if="status">
                <ul id="statusul">
                    <li id="status-profile">
                        <div id="status-img"><img :src="usrset.profileimg"><span id="status-name">{{usrset.username}}</span></div>
                    </li>
                    <li>
                        <div id="status-icon"><i class="fas awefon fa-fw" :class="usrset.icon"></i><span>Magier</span></div>
                    </li>
                    <li>
                        <div id="status-time"><i class="fas fa-chart-pie awefon fa-fw"></i><span>{{this.minites}}</span>h</div>
                    </li>
                </ul>
                <a id="menu-anc" href="contact"><i class="fas fa-external-link-alt"></i>ご意見</a>
            </div>
            <div id="h-nav" v-on:click="statustoggle">
                <i class="fas fa-chevron-left" v-if="status"></i>
                <div id="menu-img" v-if="!status"><img :src="usrset.profileimg"></div>
                <span id="menu-name" v-if="!status">{{usrset.username}}</span>
            </div>
            <div class="filter-icon">
                <i class="fas fa-filter"></i>
            </div>
            <select required class="filter-option" v-on:change="$emit('filtselect')">
                <option >視聴日時順</option>
                <option selected>50音順</option>
            </select>
            <div id="displayer" v-on:click="displaytoggle">
                <i class="fas fa-list-ul" id="display-list" v-if="list"></i>
                <i class="fas fa-th-large" id="display-garally" v-if="!list"></i>
            </div>
        </div>
        <ul>
            <minicard v-for="(item,index) in artarray" v-bind:onecard="item" v-bind:index="index" v-bind:key="item.id" @selectart="$emit('selectart',$event)" v-if="!list"></minicard>
            <Garally v-for="(item,index) in artarray" v-bind:onecard="item" v-bind:index="index" v-bind:key="item.id" @selectart="$emit('selectart',$event)" v-if="list"></Garally>
        </ul>
    </aside>
    `,
    component:{
         "minicard":onecardnent,
         "Garally":onegarallynent
    },
    computed: {
        minites(){
            return Math.round((this.usrset.watchtime/60) * 10) / 10;
        }
    },
    methods: {
        statustoggle(){
            this.status = !this.status;
        },
        displaytoggle(){
            this.list = !this.list;
        }
    },
    created: function(){
        document.body.style.height = "92.5vh";
        document.getElementById("wrap").style.height = "92.5vh";
    },
    // destroyed: function(){
    //     document.body.style.height = "100%";
    //     document.getElementById("wrap").style.height = "100%";
    //     document.body.style.minHeight = "100%";
        
    // }
})

export {AsideBoard};