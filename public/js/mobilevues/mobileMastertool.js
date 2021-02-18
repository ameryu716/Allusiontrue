const Mastertool = Vue.component("Mastertool", {
    props: {
        imgsrc: String,
        createmode: Boolean
    },
    data: function(){
        return {
            sharehide: true
        }
    },
    template: `
    <div class="mastertools">
        <ul class="navtools-ul">
            <li id="nav-home" v-on:click="$emit('backhome')">
                <i class="fas fa-home"></i>
            </li>
            <li id="card-garally">
                <i class="fas fa-share-alt" v-on:click="sharetoggle"></i>
                <transition name="fade">
                    <div class="share-hide" v-if="!sharehide&&!createmode">
                        <div v-on:click="$emit('cardCreateRun','save')">
                            <i class="fas fa-clipboard"></i><span>保存</span>
                        </div>
                        <div v-on:click="$emit('cardCreateRun','share')">
                            <i class="fas fa-share-alt"></i><span>外部に共有</span>
                        </div>
                    </div>
                </transition>
            </li>
            <li id="setting" v-on:click="$emit('letset')">
                <img :src="imgsrc" style="display:none;">
                <i class="fas fa-cog"></i>
            </li>
        </ul>
    </div>
    `,
    methods: {
        sharetoggle(){
            if(!this.createmode){
                this.sharehide = !this.sharehide;
            }
        }
    }
})

export {Mastertool};