import {onecardnent} from "./cardlistew.js";

const AsideBoard = Vue.component("asideboard", {
    props:["don"],
    data: function(){
        return{
            onecard: this.don[0]
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
            <minicard v-for="item in don[0]" v-bind:onecard="item" v-bind:key="item.id"></minicard>
        </ul>
    </aside>
    `,
    component:{
         "minicard":onecardnent,
    }
})

export {AsideBoard};