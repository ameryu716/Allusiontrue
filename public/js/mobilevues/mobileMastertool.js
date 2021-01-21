import {imgLoad, imgSave} from "../effect/imgLocalIndex.js";

const Mastertool = Vue.component("Mastertool", {
    props: {
        imgsrc: String
    },
    template: `
    <div class="mastertools">
        <ul class="navtools-ul">
            <li id="nav-home"><i class="fas fa-home"></i></li>
            <li id="card-garally"><i class="fas fa-clipboard"></i></li>
            <li id="setting">
                <img :src="imgsrc">
            </li>
        </ul>
    </div>
    `,
    methods: {

    }
})

export {Mastertool};