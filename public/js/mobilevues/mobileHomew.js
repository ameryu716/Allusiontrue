import {selfer} from "./mobileSelfFieldew.js";

const Homedent = Vue.component("home",{
    components: {
        "Selfer": selfer
    },
    props:{
        coa: Object,
        dself: String,
    },
    template:`
    <main id="homew">
        <div v-on:click="$emit('graphtoggle')">
            <i class="far fa-calendar-alt"></i>
            <i class="fas fa-arrows-alt-h"></i>
            <i class="fas fa-chart-line"></i>
        </div>
        <Selfer v-bind:disp="dself" v-bind:selfobj="coa"></Selfer>
    </main>
    `
});

export {Homedent};