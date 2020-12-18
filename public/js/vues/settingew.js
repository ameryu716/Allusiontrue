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
        <form action="/home/setting" method="POST" id="setform" enctype="multipart/form-data">
            <div id="modoru" v-on:click="$emit('backhome')">
                <i class="fas fa-arrow-left"></i>
            </div>
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
    </main> 
    `,
    methods: {
        iconcheck(){
            const select = document.getElementById("iconselect");
            this.iconnum = select.value;
        },
        prevon(){
            const imgfile = document.getElementById("img-file").files[0];
            const canvas = document.getElementById('canvas');
            const beforebox = document.getElementById('beimgbox');
            let dimg = new Image(100,100);
            dimg.width = 100;
            dimg.height = 100;
            // dimg.file = imgfile;

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
                beforebox.style.display = "none";
            }, 2000);
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

    }
})

export {Settingent};