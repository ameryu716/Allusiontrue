const Homedent = Vue.component("home",{
    props:{
        coa: Object
    },
    data: function(){
        return{
            calendDisplay: this.coa.calendDisplay
        }
    },
    method:{
        close(){
            this.$emit("open");
        },
    },
    template:`
    <main id="homew">
        <div class="name">
            <img :src="coa.profileimg">
            <span>{{coa.username}}</span>
        </div>
        <div class="status">
                <div><i class="fas awefon fa-fw" :class="coa.icon"></i><span>Magier</span></div>
                <div v-on:click="$emit('graphtoggle')">
                
                    <i class="far fa-calendar-alt"></i>
                    <i class="fas fa-arrows-alt-h"></i>
                    <i class="fas fa-chart-line"></i>
                </div>
                <div><i class="fas fa-chart-pie awefon fa-fw"></i><span>{{coa.watchtime}}</span></div>
        </div>
        <div class="self">
            {{coa.profiletext}}
        </div>
        <div class="move">
            <ul>
                <ol v-on:click="$emit('goart')"><i class="fas fa-pen awefon fa-fw"></i>記録する</ol>
                <ol><i class="fas fa-plus awefon fa-fw"></i>カードを作成する</ol>
                <ol><i class="fas fa-wrench awefon fa-fw"></i>調整する</ol>
            </ul>
        </div>
        <div class="option">
            <i class="fas fa-cog"></i>
        </div>
    </main>
    `,
});


export {Homedent};