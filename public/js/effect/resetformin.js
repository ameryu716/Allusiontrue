import {headeralpfa} from '../vues/header.js';

const resetform = Vue.component("Reseter",{
    components: {
        "Alluheader": headeralpfa,
    },
    template:`
    <div id="vue-rendering">
        <Alluheader></Alluheader>
        <main class="main">
            <div id="resetform" class="formdiv">
                <form action="/login/passreset" method="POST" name="reset" id="form-element" class="form">
                    <div id="reset-form-title" class="form-title">
                        <span>Reset</span>
                    </div>
                    <input type="password" name="pass" placeholder="pass" id="reset-form-pass" class="loginput resetinput form-pass" v-model="pass">
                    <input type="password" name="passmore" placeholder="pass(onemore)" id="reset-form-pass2" class="loginput resetinput form-pass" v-model="passOnemore">
                    <div class="errordiv">
                        <p v-if="passcheck" class="error-message">パスワードが短すぎます</p>
                        <p v-if="passequal" class="error-message">パスワードは同じものを入力してください</p>
                    </div>
                    <input type="hidden" name="email" id="reset-form-email" v-model="email">
                    <input type="hidden" name="token" id="reset-form-token" v-model="token">
                    <input type="submit" value="Enter" id="reset-form-submit" class="form-submit">
                </form>
            </div>
            <div id="help">
                <small>
                ◎入力いただいた情報は確実に暗号化しサーバーに送信し、責任を持って管理致します。
                また、当情報は本サービスのログイン・ログアウト・登録機能にのみ用いるものとし、
                その他一切の利用方法では利用をしないことをお約束いたします。
                </small>
            </div>
        </main>
    </div>
    `,
    computed: {
        passcheck: function(){
            return this.pass.length <= 10;
        },
        passequal: function(){
            return !(this.pass === this.passOnemore);
        },
    },
    data: function(){
        return {
            pass: "",
            passOnemore: "",
            email: "",
            token: ""
        }
    },
    created(){
        const url = encodeURI(location.href);
        const slash = url.split("/");
        this.token = slash[slash.length-1].split("?")[0];
        this.email = slash[slash.length-1].split("?")[1].split("=")[1];
    }
})

const fvue = new Vue({
    el: "#wrap",
})