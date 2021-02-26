const Statuslist = Vue.component("Statuslister", {
    props:{
        artarray: Array,
        usrset: Object
    },
    template: `
        <div id="statuslist">
            <ul id="statusul">
                <li id="status-profile">
                    <div id="status-img"><img :src="usrset.profileimg"><span id="status-name">{{usrset.username}}</span></div>
                </li>
                <li>
                    <div id="status-icon"><i class="fas awefon fa-fw" :class="usrset.icon"></i><span>Magier</span></div>
                </li>
                <li>
                    <div id="status-time"><i class="fas fa-chart-pie awefon fa-fw"></i><span>{{this.minites}}</span>h</div>
                </li>
                <li>
                    <div id="status-graph"><canvas id="bargraph" width="170" height="130"></canvas></div>
                </li>
            </ul>
            <a id="menu-anc" href="contact"><i class="fas fa-external-link-alt"></i>ご意見</a>
        </div>
    `,
    computed: {
        minites(){
            return Math.round((this.usrset.watchtime/60) * 10) / 10;
        }
    },
    methods: {
        calendYearMatch(ginfo1,year){
            return ginfo1.sawdate.split("/")[0] == year;
        }
    },
    created: function(){
        setTimeout(() => {
            const newrYearArrLabeling = [];
            const ChartData = [0,0,0,0,0,0,0,0];
            let atthis = this;
            let firstdata2014 = 2014;
            
            for(let i=0;i<8;i++){
                const yearParts = new Date().getFullYear()-7;
                newrYearArrLabeling.push(String(yearParts+i));
                //グラフ用年数ラベル作成
            }
            for(let i=0;i<8;i++){
                for(let u=0;u<atthis.artarray.length;u++){
                    if(atthis.calendYearMatch(atthis.artarray[u],String(firstdata2014))){
                        ChartData[i] += Math.round(atthis.artarray[u].scale/60*10)/10;
                        console.log("check");
                    }
                }
                firstdata2014+=1;
                //各年数視聴時間計算
            }
            
            Chart.defaults.global.defaultFontColor = '#fff';
            const myData = document.getElementById('bargraph');
            new Chart(myData, {
                type: 'line',
                data: {
                    labels: newrYearArrLabeling,
                    datasets: [{
                        label: '作品視聴時間（時間・h）',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        defaultFontColor: '#fff',
                        data: ChartData,
                        lineTension: 0,
                        fill: false
                    }]
                },
                options: {
                    scales: {
                      yAxes: [{
                         ticks: {
                           maxTicksLimit:6
                         }
                      }]
                   }
                }
            });
        }, 500);
    }
})

export {Statuslist};