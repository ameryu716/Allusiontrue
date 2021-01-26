let express = require('express');
let router = express.Router();
const bcrypt = require('bcrypt');
const usrDataSet = require("./moduleUSRD.js");
const artDataSet = require('./moduleARTD.js');
const db = require("../models/index.js");
const Op = db.Sequelize.Op;
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const APP_KEY = process.env.key_appkey;
// トップURL
const APP_URL = 'https://allusion3.herokuapp.com';
// メール送信設定

const smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // SSL
    auth: {
        user: process.env.key_mailuser,
        pass: process.env.key_mailpass
    }
};

let transporter = nodemailer.createTransport(smtpConfig)

function hashing(pass){
    const hashedpass = bcrypt.hashSync(pass,10);
    return hashedpass;
};

router.get("/",(req,res)=>{
    if(req.session.login){
        res.redirect('/');
    }
    req.session.usr_data = undefined;
    req.session.mail = undefined;
    req.session.login = undefined;
    req.session.art_data = undefined;
    res.render("formin",{
        title: "LOGFORM",
        content: "LOGIN/LOGOUT",
        loginErrorm: req.query.loginerror,
        setupErrorm: req.query.setuperror
    });
});

router.get("/password/reset/:token",(req,res)=>{
    // console.log(req.params.token);
    res.render("passreset",{
        title: "RESETFORM",
        error: ""
    });
})

router.post("/setup",(req,res)=>{
    //xssたいさく
    const sendedmail = req.body["mail"];
    const sendedpass = req.body["pass"];
    const hashedpass = hashing(sendedpass);
    setupRun(sendedmail,hashedpass,res)
    .then(r =>{
        usrDataSet(r,req)
        .then(r => {
            req.session.login = true;
            req.session.mail = sendedmail;
            res.redirect('/');
        })
        .then(r =>{
            console.log("arttable is moved.....");
            //artTableCreate(tablename).then(r => console.log("ART TABLE"+r+" CREATE:成功！"));
        })
    })
})

async function setupRun(sendedmail,sendedpass,res){
    return new Promise((resolve,reject)=>{

        db.Userinfo.findOne({
            where: {
                mail:{ [Op.eq]:sendedmail }
            }
        })
        .then(r =>{
            if(r == null){
                console.log("検索結果「０」");
                console.log("ユーザー登録を実行します");
                usrInsertRun(sendedmail,sendedpass)
                .then(r => resolve(r));
            }else{
                console.log("検索結果エラー");
                res.redirect('/login'+'?setuperror=このメールアドレスは使用できません');
            }
        })
        .catch(e => console.error(e));
    })
}

router.post('/login',(req,res)=>{
    const sendedmail = req.body["mail"];
    const sendedpass = req.body["pass"];

    loginRun(sendedmail,sendedpass,req,res)
    .then(r =>{
        // const tablename = "arttable"+req.session.usr_data.id;
        artDataSet(r,req)
        .then(() => {
            req.session.login = true;
            req.session.mail = sendedmail;
            res.redirect('/');
        })
    })
    .catch(e => console.log(e));
})

router.post('/forforgot',(req,res)=>{
    const sendedmail = req.body["mail"];
    remindRun(sendedmail,req,res)
    .then(r=>{
        res.render("message",{
            title: "Mail-Message",
            message: r,
            color: "#565656",
            redirect: false,
        })
    })
    .catch(e =>{
        throw new Error(e);
    })
})

router.post('/passreset',(req,res)=>{
    const email = req.body["email"];
    const trueemail = email.replace("%2540","@");
    const token = req.body["token"];
    const pass = req.body["pass"];
    const hashedpass = hashing(pass);
    const email2 = decodeURIComponent(email);
    // console.log("email:"+email);
    // console.log("email2:"+email2);
    // console.log("trueemail:"+trueemail);
    // console.log("token:"+token);
    // console.log("pass:"+pass);
    // console.log("hashpass:"+hashedpass);
    // console.log("true???"+bcrypt.compareSync(pass,hashedpass));

    resetCheckPossible(email2,token,res)
    .then(r => {
        console.log(r);
        if(r){
            // resetdbにemail&token情報を照合>>token=true
            passReset(trueemail,hashedpass)
            .then((r)=>{
                res.render("message",{
                    title: "Mail-Message",
                    message: r,
                    color: "green",
                    redirect: true,
                })
            })
            .catch(e =>{
                res.redirect('/login/password/reset/'+token+'?setuperror=パスワード変更に失敗しました2');
            })
        }else{
            res.redirect("/login?reseterror=不正な変更が行われました");
        }
    })
    .catch(e => res.redirect('/login/password/reset/'+token+'?setuperror=パスワード変更に失敗しました'));
    
    //pass情報を登録(userinfo)
})


async function loginRun(sendedmail,sendedpass,req,res){
    return new Promise((resolve,reject)=>{

        db.Userinfo.findOne({
            where: {
                mail:{ [Op.eq]:sendedmail }
            }
        })
        .then(result => {
            // console.log("queryresult:"+result);
            // console.log("resultpass::::::::"+result.pass);
            // console.log("naturalresult:"+bcrypt.compareSync(sendedpass,result.pass));
            // console.log("nextresult:"+bcrypt.compareSync(sendedpass,hashing(result.pass)));
            if(result !== null){
                if(bcrypt.compareSync(sendedpass,result.pass)){
                    console.log("ログイン処理を開始します");
                    usrDataSet(sendedmail,req)
                    .then(()=>{
                        console.log("ユーザー："+sendedmail+",id:"+req.session.usr_data.id+"　でログインしました。")
                        resolve(req.session.usr_data.id);
                    })
                    .catch(e5 => console.error(e5));         
                }else if(!(bcrypt.compareSync(sendedpass,result.pass))){
                    res.redirect('/login'+'?loginerror=ログインが不正です');
                    reject("passerror");
                }else{
                    console.error("不明な処理が行われました");
                }
            }else if(result == null){
                console.log("該当メールアドレスがありません");
                res.redirect('/login'+'?loginerror=メールアドレスが不正です');
                reject("mailerror");
            }else{
                console.error("リザルトエラーです");
            }
        })
        .catch(errs => console.error(errs));
    })
}

async function usrInsertRun(sendedmail,sendedpass){
    return new Promise((resolve,reject)=>{
        db.sequelize.sync()
        .then(()=> db.Userinfo.create({
            mail: sendedmail,
            pass: sendedpass
        }))
        .then(r => {
            console.log("seqINSERT：完了");
            resolve(sendedmail);
        })
        .catch((e2) => {
            console.log("seqINSERT：失敗");
            reject(e2);
        })
    })
}

async function isUserinfoOne(mail){
    return new Promise((resolve,reject)=>{
        db.Userinfo.findOne({
            where: {
                mail:{ [Op.eq]:mail }
            }
        })
        .then(result => {
            if(result !== null){
                resolve();
            }
        })
        .catch(e =>{
            reject(e);
        })
    })
}

async function remindRun(sendedmail,req,res){
    return new Promise((resolve,reject)=>{
        const email = sendedmail;
        const emailurl = encodeURIComponent(email);
        const randomStr = Math.random().toFixed(36).substring(2, 38);
        const token = crypto.createHmac('sha256', APP_KEY)
        .update(randomStr)
        .digest('hex');
        const passwordResetUrl = APP_URL +'/login/password/reset/'+ token +'?email='+ emailurl;

        isUserinfoOne(email)
        .then(()=>{
            db.PasswordReset2.findOrCreate({
                where: {
                    email: emailurl
                },
                defaults: {
                    email: emailurl,
                    token: token,
                    createdAt: new Date()
                }
            })
            .then(([passwordReset, created]) => {
                if(!created) {
                    passwordReset.token = token;
                    passwordReset.createdAt = new Date();
                    passwordReset.save();
                }
                // メール送信
                const message = {
                    from: 'allusion@mail.com',
                    to: email,
                    text: "以下のURLをクリックしてパスワードを再発行してください。\n\n"+ passwordResetUrl,
                    subject: 'パスワード再発行メール',
                };
                try{
                    transporter.sendMail(message, function(error, info){
                        // エラー発生時
                        if(error){
                            console.log("send failed");
                            console.log(error.message);
                            resolve("メール送信に失敗しました。");
                        }
                        // 送信成功
                        console.log("send successful");
                        console.log(info.messageId);
                        resolve("メールを送信しました。メール内のリンクからパスワードリセットを実行してください。");
                    });
                }catch(e) {
                    console.log("MailError!!!:::",e);
                }
            })
        })
    })
}

async function resetCheckPossible(sendedmail,token,res){
    return new Promise((resolve,reject)=>{
        db.PasswordReset2.findOne({
            where: {
                email:{ [Op.eq]:sendedmail }
            }
        })
        .then(result => {
            if(result !== null){
                resolve(result.token === token);
            }else{
                reject();
            }
        })
        .catch(e =>{
            reject(e);
        })
    })
}

async function passReset(mail,pass){
    return new Promise((resove,reject)=>{
        db.sequelize.sync()
        .then(()=> db.Userinfo.update({
            pass: pass
        },
        {
            where: {
                mail:{ [Op.eq]:mail }
            }
        }))
        .then(()=>{
            resove("パスワードを変更しました。ページは自動的にログインページにリダイレクトされます。");
        })
        .catch(e => reject(e))
    })
}

module.exports = router;