import {headeralpfa} from '../vues/header.js';

new Vue({
    el: "#wrap",
    data: function(){
        return {
            email: "",
            pass: "",
            passOnemore: "",
        }
    },
    components: {
        "Alluheader": headeralpfa,
    },
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
        }
    },
})

const FormState = {
    type: String,
    appeared : ""
}

const loginEnterbox = document.getElementById("login-enterbox");
const signupEnterbox = document.getElementById("signup-enterbox");


const loginEnterSpan = loginEnterbox.firstElementChild;
const signupEnterSpan = signupEnterbox.firstElementChild;

const loginArrow = document.getElementById("login-arrow");
const signupArrow = document.getElementById("signup-arrow");



const loginForm = document.getElementById("loginform");
const loginPasAppear = document.getElementById("login-pasappear");
const loginFormMail = document.getElementById("login-form-mail");
const loginFormPass = document.getElementById("login-form-pass");

const signupForm = document.getElementById("signupform");
const signupPasAppear1 = document.getElementById("signup-pasappear1");
const signupPasAppear2 = document.getElementById("signup-pasappear2");
const signupFormMail = document.getElementById("signup-form-mail");
const signupFormPass1 = document.getElementById("signup-form-pass1");
const signupFormPass2 = document.getElementById("signup-form-pass2");


const loginSelectBack = document.getElementById("login-selectback");
const signupSelectBack = document.getElementById("signup-selectback");


let enterflag = true; //イベントは一回のみ

const DelayFadein = (delay,...node)=>{
    if(delay<10){
        for(let i=0;i<node.length;i++){
            node[i].style.display = "block";
            node[i].style.transition = 0;
            node[i].style.opacity = "0";
            node[i].style.transition = delay+"s";
            setTimeout(()=>{
                node[i].style.opacity = "1";
            },100)
        }
    }else{
        console.error("フェード秒数が長すぎます");
    }
}//※フェード秒数は10秒以内です

const DelayFadeout = (delay,...node)=>{
    if(delay<10){
        for(let i=0;i<node.length;i++){
            node[i].style.transition = 0;
            node[i].style.opacity = "1";
            node[i].style.transition = delay+"s";
            node[i].style.opacity = "0";
            setTimeout(()=>{
                node[i].style.display = "none";
            },delay*900)
        }
    }else{
        console.error("フェード秒数が長すぎます");
    }
}//※フェード秒数は10秒以内です

const enterboxReset = function(){
    switch(FormState.appeared){
        case "login":
            loginEnterbox.style.transition = "0.8s";
            DelayFadein(0.5,loginArrow,signupEnterbox,signupArrow);
            loginEnterbox.style.transform = "rotateZ(-30deg)";
            loginEnterbox.style.top = "115px";
            loginEnterbox.style.height = "125px";
            loginEnterbox.style.left = "20%";
            loginEnterbox.style.boxShadow = "2px 2px 5px 0 rgba(0,0,0,0.5)";
            loginEnterbox.style.border = "solid 2px rgba(0,255,0,0.5)";
            loginEnterSpan.style.margin = "38px auto";
            loginEnterSpan.style.fontSize = "30px";
        break;
        case "signup":
            signupEnterbox.style.transition = "0.8s";
            DelayFadein(0.5,signupArrow,loginEnterbox,loginArrow);
            signupEnterbox.style.transform = "rotateZ(-30deg)";
            signupEnterbox.style.top = "115px";
            signupEnterbox.style.height = "125px";
            signupEnterbox.style.right = "32%";
            signupEnterbox.style.boxShadow = "2px 2px 5px 0 rgba(0,0,0,0.5)";
            signupEnterbox.style.border = "solid 2px rgba(255,0,0,0.5)";
            signupEnterSpan.style.margin = "38px auto";
            signupEnterSpan.style.fontSize = "30px";
        break;
    }
    enterflag = true;
}

loginEnterbox.addEventListener("mouseenter",()=>{
    if(enterflag){
        enterflag = false;
        FormState.appeared = "login";
        loginEnterbox.style.transition = "1.5s";
        DelayFadeout(0.5,loginArrow,signupEnterbox,signupArrow);
        loginEnterbox.style.transform = "rotateZ(1800deg)";
        loginEnterbox.style.top = "20px";
        loginEnterbox.style.height = "50px";
        loginEnterbox.style.left = "43.5%";
        loginEnterbox.style.boxShadow = "none";
        loginEnterbox.style.border = "none";
        loginEnterSpan.style.margin = "0";
        loginEnterSpan.style.fontSize = "38px";
        DelayFadein(1,loginForm);
        loginFormMail.focus();
    }
})

signupEnterbox.addEventListener("mouseenter",()=>{
    if(enterflag){
        enterflag = false;
        FormState.appeared = "signup";
        signupEnterbox.style.transition = "1.5s";
        DelayFadeout(0.5,signupArrow,loginEnterbox,loginArrow);
        signupEnterbox.style.transform = "rotateZ(1800deg)";
        signupEnterbox.style.top = "20px";
        signupEnterbox.style.height = "50px";
        signupEnterbox.style.right = "43.5%";
        signupEnterbox.style.boxShadow = "none";
        signupEnterbox.style.border = "none";
        signupEnterSpan.style.margin = "0";
        signupEnterSpan.style.fontSize = "38px";
        DelayFadein(1,signupForm);
        signupFormMail.focus();
    }
})

loginSelectBack.addEventListener("click",()=>{
    DelayFadeout(1,loginForm);
    enterboxReset();
})
signupSelectBack.addEventListener("click",()=>{
    DelayFadeout(1,signupForm);
    enterboxReset();
})

//passeyes
loginPasAppear.addEventListener("mousedown",()=>{
    loginFormPass.type = "text";
})
loginPasAppear.addEventListener("mouseup",()=>{
    loginFormPass.type = "password";
})
signupPasAppear1.addEventListener("mousedown",()=>{
    signupFormPass1.type = "text";
})
signupPasAppear1.addEventListener("mouseup",()=>{
    signupFormPass1.type = "password";
})

signupPasAppear2.addEventListener("mousedown",()=>{
    signupFormPass2.type = "text";
})
signupPasAppear2.addEventListener("mouseup",()=>{
    signupFormPass2.type = "password";
})