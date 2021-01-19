import {headeralpfa} from '../vues/header.js';

const signupform = Vue.component("signup",{
    template:`
    <div id="signupform" class="formdiv">
        <form action="/login/setup" method="POST" name="signup" id="signup-form-element" class="form">
            <div id="signup-form-title" class="form-title">
                <span>SignUp</span>
            </div>
            <input type="text" name="mail" placeholder="mail" id="signup-form-mail" class="signupinput loginput form-mail" v-model="email">
            <input type="password" name="pass" placeholder="pass" id="signup-form-pass1" class="signupinput loginput form-pass" v-model="pass">
            <i id="signup-pasappear1" class="pasappear">◎</i>
            <input type="password" name="notdata_pass" placeholder="pass(one-more)" id="signup-form-pass2" class="signupinput loginput form-pass" v-model="passOnemore">
            <i id="signup-pasappear2" class="pasappear">◎</i>
                <div class="errordiv">
                    <p v-if="emailcheck" class="error-message">メールアドレスは正しく入力してください</p>
                    <p v-if="passcheck" class="error-message">パスワードが貧弱です</p>
                    <p v-if="passequal" class="error-message">パスワードは同じものを入力してください</p>
                    <p class="error-message" style="padding-left: 12%;"><!-- <%=setupErrorm %> --></p>
                </div>
            <input type="submit" value="Enter" id="signup-form-submit" class="form-submit">
        </form>
    </div>`,
    computed: {
        emailcheck: function(){
            const regex = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);
            return (!regex.test(this.email) && this.email.length !== 0);
        },
        passcheck: function(){
            return this.pass.length >= 10;
        },
        passequal: function(){
            return !(this.pass === this.passOnemore);
        },
    },
    data: function(){
        return {
            email: "",
            pass: "",
            passOnemore: "",
        }
    },
    created: function(){
        setTimeout(() => {
            document.getElementById("signup-form-mail").focus();
        }, 500);
    }
});

const loginform = Vue.component("signin",{
    template:`
    <div id="loginform" class="formdiv">
        <form action="/login/login" method="POST" name="login" id="form-element" class="form">
            <div id="login-form-title" class="form-title">
                <span>Login</span>
            </div>
            <input type="text" name="mail" placeholder="mail" id="login-form-mail"  class="loginput form-mail">
            <input type="password" name="pass" placeholder="pass" id="login-form-pass" class="loginput form-pass">
            <i id="login-pasappear" class="pasappear">◎</i>
            <div class="errordiv">
                <p v-if="emailcheck" class="error-message">メールアドレスは正しく入力してください</p>
                <p class="error-message" style="text-align: center;font-size: 16px;padding-top: 5px;margin: 0 auto;"><!-- <%=loginErrorm %> --></p>
            </div>
            <p id="login-pasforgot" class="pasforgot"><a href="#" tabindex="-1" v-on:click="$emit('remind')">◎パスワードを忘れたときは...</a></p>
            <input type="submit" value="Enter" id="login-form-submit" class="form-submit">
        </form>
    </div>
    `,
    computed: {
        emailcheck: function(){
            const regex = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);
            return (!regex.test(this.email) && this.email.length !== 0);
        },
    },
    data: function(){
        return {
            email: "",
            pass: "",
            passOnemore: "",
        }
    },
    created: function(){
        setTimeout(() => {
            document.getElementById("login-form-mail").focus();
        }, 500);
    }
});

const enterbox = Vue.component("Formswitch",{
    props: {
        "formState": String
    },
    template:`
    <div class="enterboxdiv">
        <div id="login-enterbox" class="enterbox" v-on:click="$emit('login')" v-bind:class="classlogin">
            <span id="login-form-title">Login</span>
        </div>
        <div id="signup-enterbox" class="enterbox" v-on:click="$emit('signup')" v-bind:class="classsignup">
            <span id="signup-form-title">SignUp</span>
        </div>
    </div>`,
    computed: {
        classlogin: function () {
            return { loginmode: this.formState ==  "login"}
        },
        classsignup: function(){
            return { signupmode: this.formState == "signup"}
        }
    }
})

const reminder = Vue.component("Forgoter",{
    template:`
    <div id="forgotform" class="formdiv">
        <form action="/login/forforgot" method="POST" name="forgot" id="form-element" class="form">
            <div id="forgot-form-title" class="form-title">
                <span>Forgot</span>
            </div>
            <input type="text" name="mail" placeholder="mail" id="forgot-form-mail" class="loginput forgotinput form-mail">
            <div class="errordiv">
                <p v-if="emailcheck" class="error-message">メールアドレスは正しく入力してください</p>
                <p class="error-message" style="text-align: center;font-size: 16px;padding-top: 5px;margin: 0 auto;"><!-- <%=loginErrorm %> --></p>
            </div>
            <input type="submit" value="Enter" id="forgot-form-submit" class="form-submit">
        </form>
    </div>`,
    computed: {
        emailcheck: function(){
            const regex = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);
            return (!regex.test(this.email) && this.email.length !== 0);
        },
    },
    data: function(){
        return {
            email: "",
        }
    },
    created: function(){
        setTimeout(() => {
            document.getElementById("forgot-form-mail").focus();
        }, 500);
    }
})

const twoform = Vue.component("Forms",{
    props: {
        "formState": String
    },
    template:`
        <div id="vue-rendering2">
            <signin v-if="isloginform" @remind="$emit('remind')"></signin>
            <signup v-if="issignupform"></signup>
            <Forgoter v-if="isremind"></Forgoter>
        </div>
    `,
    components: {
        "signin": loginform,
        "signup": signupform,
        "Forgoter": reminder
    },
    data: function(){
        return {
            email: "",
            pass: "",
            passOnemore: "",
        }
    },
    computed: {
        isloginform: function(){
            return this.formState == "login";
        },
        issignupform: function(){
            return this.formState == "signup";
        },
        isremind: function(){
            return this.formState == "remind";
        }
    },
})

const RootA = Vue.component("formin",{
    components: {
        "Alluheader": headeralpfa,
        "Forms": twoform,
        "Formswitch": enterbox
    },
    template:`
    <div id="vue-rendering">
        <Alluheader></Alluheader>
        <main class="main">
            <Formswitch @login="loginmoderun" @signup="signupmoderun" v-bind:formState="formState"></Formswitch>
            <Forms v-bind:formState="formState" @remind="remindrun"></Forms>
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
    data: function(){
        return {
            formState: "login"
        }
    },
    methods: {
        loginmoderun(){
            this.formState = "login";
        },
        signupmoderun(){
            this.formState = "signup";
        },
        remindrun(){
            this.formState = "remind";
        }
    }
})

const fvue = new Vue({
    el: "#wrap",
    components: {
        "formin": RootA
    }
})

// const loginEnterbox = document.getElementById("login-enterbox");
// const signupEnterbox = document.getElementById("signup-enterbox");

// loginEnterbox.addEventListener("click",()=>{
//     console.log(fvue);
// })
// signupEnterbox.addEventListener("click",()=>{
//     fvue.formState = "signup";
// })