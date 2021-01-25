import {onecardnent} from "./mobileCardlistew.js";
import {aheadEffect} from "../effect/asideheaderEf.js";

const AsideBoard = Vue.component("asideboard", {
    props:{
        artarray: Array,
        ons: Number,
        usrset: Object
    },
    data: function(){
        return{
            onecard: this.artarray
        }
    }, 
    template: `
    <aside id="cardlist">
        <div class="asideheader">
            <div id="menulist" style="display:none;">
                <nav>
                    <ul>
                        <li>
                            <div id="menu-img"><img :src="usrset.profileimg"></div>
                        </li>
                        <li>
                            <span id="menu-name">{{usrset.username}}</span>
                        </li>
                        <li>
                            <a id="menu-anc" href="contact">意見</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="h-nav">
                <i class="fas fa-bars" style="display:none;"></i>
                <div id="menu-img"><img :src="usrset.profileimg"></div>
                <span id="menu-name">{{usrset.username}}</span>
            </div>
            <div class="filter-icon">
                <i class="fas fa-filter"></i>
            </div>
            <select required class="filter-option" v-on:change="$emit('filtselect')">
                <option >視聴日時順</option>
                <option selected>50音順</option>
            </select>
        </div>
        <ul>
            <minicard v-for="(item,index) in artarray" v-bind:onecard="item" v-bind:index="index" v-bind:key="item.id" @selectart="$emit('selectart',$event)"></minicard>
        </ul>
    </aside>
    `,
    component:{
         "minicard":onecardnent,
    }
})

export {AsideBoard};