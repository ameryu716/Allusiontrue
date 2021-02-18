const Stxt = Vue.component("Selftext",{
    props: {
        Text: String
    },
    template:`
    <div id="self-text">{{Text}}</div>
    `
})

const Scalend = Vue.component("Calend",{
    props: {
        cinfo: Object
    },
    template:`
    <div id="self-calender"></div>
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
    created: function(){
        setTimeout(() => {
            
            const myData = document.getElementById('bargraph');
            new Chart(myData, {
                type: 'line',
                data: {
                    labels: ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018'],
                    datasets: [{
                        label: '日本の出生児数の推移',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: [1073663, 1046825, 1044983, 1022371, 1025105, 1004068, 965289, 944146],
                        lineTension: 0,
                        fill: false
                    }, {
                        label: '日本の死亡者数の推移',
                        backgroundColor: 'rgb(10, 150, 190)',
                        borderColor: 'rgb(10, 150, 190)',
                        data: [1256387, 1248186, 1276719, 1274085, 1300537, 1299933, 1342578, 1368632],
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
        "Calend": Scalend,
        "Graph": Sgraph
    },
    template:`
    <div class="self">
        <Selftext v-if="isText" v-bind:Text="selfobj.profiletext"></Selftext>
        <Calend v-if="isCalend"></Calend>
        <Graph v-if="isGraph" v-bind:ginfo="artdata"></Graph>
    </div>
    `,
    computed: {
        isText(){
            return this.disp == "text";
        },
        isCalend(){
            return this.disp == "calend";
        },
        isGraph(){
            return this.disp == "graph";
        }
    }
})

export {selfer};