const headeralpfa = Vue.component("Alluheader",{
    props: {
        login: String
    },
    template: `
    <header class="header">
    <div id="logo"><span>Allusion</span></div>
    <div class="formin-group" style="display:none">
        <span id="header-signup" onclick="location.href='./login'" v-if="islogin">サインアップ</span>
        <span id="header-login" onclick="location.href='./login'" v-if="islogout">ログイン</span>
        <span id="header-logout" onclick="location.href='./login'">ログアウト</span>
    </div>
    </header>
    `,
    computed: {
        islogin(){
            return (this.login == "login");
        },
        islogout(){
            return (this.login == "logout");
        }
    }
});

export {headeralpfa}