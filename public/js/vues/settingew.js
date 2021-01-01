import {imgLoad, imgSave} from "../effect/imgLocalIndex.js";

const Settingent = Vue.component("setting",{
    props:{
        set: Object
    },
    data: function(){
        return {
            iconselect: "<i class='fas fa-atlas'></i>",
            iconnum: 0,
            usrname: this.set.username,
            pimg: this.set.profileimg,
            ftxt: this.set.profiletext
        }
    },
    template:`
    <main id="optiondisplay">
        <div id="modoru" v-on:click="$emit('backhome')">
            <i class="fas fa-arrow-left"></i>
        </div>
        <form action="/setting" method="POST" id="setform">
            <div id="username" class="settingobj">
                <div class="set-caption">
                    <span>ユーザーネーム</span>
                </div>
                <div class="set-input">
                    <input type="text" v-model="usrname" name="usrname">
                </div>
            </div>
            <div id="icon" class="settingobj">
                <div class="set-caption">
                    <span>アイコン</span>
                </div>
                <div class="set-input">
                    <div id="icon-now">
                        <i class="fas" v-bind:class="iconis"></i>
                    </div>
                    <select v-on:change="iconcheck" id="iconselect" name="iconselect">
                        <option value="1" selected>1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
            </div>
            <div id="pimgd" class="settingobj">
                <div class="set-caption">
                    <span>プロフィール画像</span>
                </div>
                <div class="set-input">
                    <div id="beimgbox">
                        <img :src="pimg" id="beimg">
                    </div>
                    <div id="cvbox">
                        <canvas id="canvas" height="100" width="100"></canvas>
                    </div>
                    <input type="file" id="img-file" accept="image/*" name="pimg" v-on:change="prevon">
                    <input type="text" name="imgsrcstr" id="imgsrcstr" hidden>
                </div>
            </div>
            <div id="ftxtd" class="settingobj">
                <div class="set-caption">
                    <span>自由入力欄</span>
                </div>
                <div class="set-input">
                    <textarea name="ftxt" id="ftxt" v-model="ftxt"></textarea>
                </div>
            </div>
            <input type="submit" value="変更する" id="setsubmit">
        </form>
        <label for="theme-change" id="themeinput">
            ダークテーマ
            <input type="checkbox" id="theme-change" v-on:click="$emit('themechange')">
        </label>
        <div id="logouter" onclick="location.href='./login'">ログアウト</div>
    </main> 
    `,
    methods: {
        iconcheck(){
            const select = document.getElementById("iconselect");
            this.iconnum = select.value;
        },
        prevon(){
            console.log("prevew開始");
            const imgfile = document.getElementById("img-file").files[0];
            const canvas = document.getElementById('canvas');
            const beforebox = document.getElementById('beimgbox');
            const sendIstr = document.getElementById("imgsrcstr");
            let dimg = new Image(100,100);
            dimg.width = 100;
            dimg.height = 100;

            let reader = new FileReader();
            reader.readAsDataURL(imgfile);
            reader.onload = function() {
                dimg.src = reader.result;
            };
            setTimeout(() => {
                canvas.width = 100;
                canvas.height = 100;
                let ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, 100,100);
                // 画像をコピーします (このメソッドで画像をカットすることができます)
                ctx.drawImage(dimg, 0, 0,100,100);

                imgSave(canvas,imgfile.name)
                .then(r => sendIstr.value=r);

                beforebox.style.display = "none";
            }, 500);
        },
    },
    computed: {
        iconis(){
            return {
                'fa-atlas': (this.iconnum == "0"),
                'fa-broom': (this.iconnum == "1"),
                'fa-bolt': (this.iconnum == "2"),
                'fa-crow': (this.iconnum == "3")
            }
        },

    },
    // created(){
    //     setTimeout(() => {
    //         const img = document.getElementById("beimg");
    //         console.log(img)
    //         imgLoad("uten.jpg",img)
    //         .then(r => console.log(r));  
    //     }, 1000);
    // }
})






export {Settingent};