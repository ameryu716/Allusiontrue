const Stxt = Vue.component("Selftext",{
    props: {
        Text: String
    },
    template:`
    <div id="self-text">{{Text}}</div>
    `
})

const Sgraph = Vue.component("Graph",{
    props: {
        ginfo: Array
    },
    template:`
    <div id="self-graph">
        <canvas id="bargraph"></canvas>
    </div>
    `,
    methods: {
        compareFunc(a, b) {
            return a - b;
        }
    },
    created: function(){
        setTimeout(() => {
            const calendArr = this.ginfo.map(ginfo1 => {
                return Number(ginfo1.sawdate.split("/")[0]);
            });
            console.log(calendArr);

            

            const newrYearArr = [];
            const newrYearArrLabeling = [];
            for(let i=0;i<8;i++){
                const yearParts = new Date().getFullYear()-7;
                newrYearArr.push(yearParts+i);
                newrYearArrLabeling.push(String(yearParts+i));
            }
            console.log("year:"+newrYearArr);
            console.log("label:"+newrYearArrLabeling);

            const myData = document.getElementById('bargraph');
            new Chart(myData, {
                type: 'line',
                data: {
                    labels: newrYearArrLabeling,
                    datasets: [{
                        label: '作品視聴時間（時間・h）',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: [1073663, 1046825, 1044983, 1022371, 1025105, 1004068, 965289, 944146],
                        lineTension: 0,
                        fill: false
                    }]
                }
            });
        }, 500);
    }
})

const selfer = Vue.component("Selfer",{
    props: {
        disp: String,
        selfobj: Object,
        artdata: Array
    },
    components: {
        "Selftext": Stxt,
        "Graph": Sgraph
    },
    template:`
    <div class="self">
        <Selftext v-if="isText" v-bind:Text="selfobj.profiletext"></Selftext>
        <Graph v-if="isGraph" v-bind:ginfo="artdata"></Graph>
    </div>
    `,
    computed: {
        isText(){
            return this.disp == "text";
        },
        isGraph(){
            return this.disp == "graph";
        }
    }
})

export {selfer};