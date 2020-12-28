import {onecardnent} from "./cardlistew.js";
import {aheadEffect} from "../effect/asideheaderEf.js";

const AsideBoard = Vue.component("asideboard", {
    props:{
        artarray: Array,
        ons: Number
    },
    data: function(){
        return{
            onecard: this.artarray
        }
    },
    template: `
    <aside id="cardlist">
        <div class="asideheader">
            <div class="filter-icon">
                <i class="fas fa-filter"></i>
            </div>
            <select required class="filter-option">
                <option>視聴日時順</option>
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
    },
    created(){
        aheadEffect();
    }
})

export {AsideBoard};