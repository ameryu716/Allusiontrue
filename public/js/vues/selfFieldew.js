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
    created: function(){
        setTimeout(() => {
            const newrYearArrLabeling = [];
            const ChartData = [0,0,0,0,0,0,0,0];
            let atthis = this;
            let firstdata2014 = 2014;
            function calendYearMatch(ginfo1,year){
                return ginfo1.sawdate.split("/")[0] == year;
            }
            
            for(let i=0;i<8;i++){
                const yearParts = new Date().getFullYear()-7;
                newrYearArrLabeling.push(String(yearParts+i));
                //グラフ用年数ラベル作成
            }
            for(let i=0;i<8;i++){
                for(let u=0;u<atthis.ginfo.length;u++){
                    if(calendYearMatch(atthis.ginfo[u],String(firstdata2014))){
                        ChartData[i] += Math.round(atthis.ginfo[u].scale/60*10)/10;
                        console.log("check");
                    }
                }
                firstdata2014+=1;
                //各年数視聴時間計算
            }
            
            const myData = document.getElementById('bargraph');
            new Chart(myData, {
                type: 'line',
                data: {
                    labels: newrYearArrLabeling,
                    datasets: [{
                        label: '作品視聴時間（時間・h）',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: ChartData,
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