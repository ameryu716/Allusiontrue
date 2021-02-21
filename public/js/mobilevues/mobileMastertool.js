const Mastertool = Vue.component("Mastertool", {
    template: `
    <div class="mastertools">
        <ul class="navtools-ul">
            <li id="nav-home" v-on:click="$emit('backhome')">
                <i class="fas fa-home"></i>
            </li>
            <li id="card-garally">
                <i class="fas fa-share-alt" v-on:click="$emit('cardCreateRun','save')"></i>
            </li>
            <li id="setting" v-on:click="$emit('letset')">
                <i class="fas fa-cog"></i>
            </li>
        </ul>
    </div>
    `
})

export {Mastertool};