const headeralpfa = Vue.component("Alluheader",{
    props: {
        login: String
    },
    template: `
    <header class="header">
        <div id="logo"><span>Allusion</span></div>
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