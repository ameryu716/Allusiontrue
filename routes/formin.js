let express = require('express');
let router = express.Router();
const hashtool = require('./hashModule.js');
const bcrypt = require('bcrypt');
const pool = require("./pool.js");
const usrDataSet = require("./moduleUSRD.js");
const artDataSet = require('./moduleARTD.js');
const s_quatation = "'";


router.get("/",(req,res)=>{
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

router.post("/setup",(req,res)=>{
    //xssたいさく
    const sendedmail = req.body["mail"];
    //console.log("THIS IS SENDED:"+sendedmail);
    const sendedpass = req.body["pass"];
    setupRun(sendedmail,sendedpass,res)
    .then(r =>{
        usrDataSet(r,req)
        .then(r => {
            req.session.login = true;
            req.session.mail = sendedmail;
            res.redirect('/home');
        })
        .then(r =>{
            const tablename = "arttable"+ req.session.usr_data.id;
            artTableCreate(tablename).then(r => console.log("ART TABLE"+r+" CREATE:成功！"));
        })
    })
})

async function artTableCreate(tablename){
    return new Promise((resolve,reject)=>{
        const createstring = "create table "+tablename+" (id serial, title varchar(30), arttype varchar(10), scale integer, sawdate date, onaired date, created varchar(20), thumbnail varchar(100), ftxt varchar(50));"
        pool.connect((e, client) =>{
            client
                .query(createstring)
                .then(result => {
                    console.log("CREATE：完了");
                    resolve(tablename);
                })
                .catch((e2) => {
                    console.log("CREATE：失敗");
                    console.error(e2.stack);
                    reject(e2);
                })
        })
    })
}


async function setupRun(sendedmail,sendedpass,res){
    return new Promise((resolve,reject)=>{
        const querystring = "select count(*) from userinfo where mail="+s_quatation+sendedmail+s_quatation + "";
        console.log("THISIS QUERY:"+querystring);

        pool.connect((err, client)=>{
            if (err){
                console.log("コネクトエラーです");
                throw new Error(err);
            }else{
                client
                .query(querystring)
                .then(result => {
                    if(result.rows[0].count == 0){
                        console.log("検索結果「０」");
                        console.log("ユーザー登録を実行します");
                        usrInsertRun(sendedmail,sendedpass)
                        .then(r => resolve(r));
    
                    }else if(result.rows[0].count > 0){
                        console.log("検索結果「1」以上");
    
                        res.redirect('/login'+'?setuperror=このメールアドレスは使用できません');
                    }
                })
                .catch(e => console.error(e));
            }
        })


    })
}





router.post('/login',(req,res)=>{
    const sendedmail = req.body["mail"];
    const sendedpass = req.body["pass"];

    loginRun(sendedmail,sendedpass,req,res)
    .then(r =>{
        const tablename = "arttable"+req.session.usr_data.id;
        artDataSet(tablename,req)
        .then(r => {
            req.session.login = true;
            req.session.mail = sendedmail;
            res.redirect('/home');
        })
    })
    .catch(e => console.log(e));

})

async function loginRun(sendedmail,sendedpass,req,res){
    return new Promise((resolve,reject)=>{
        const querystring = "select pass from userinfo where mail=" +s_quatation+ sendedmail +s_quatation;
        console.log("LOGINRUN QUERY THIS:"+querystring);
        pool.connect((err, client)=>{
            if(err){
                console.log("iferr:"+err);
                throw new Error(err);
            }else{
                client
                    .query(querystring)
                    .then(result => {
                        console.log("queryresult:"+result);
                        if(result.rows.length > 0){
                            // console.log("真偽："+bcrypt.compareSync(sendedpass,result.rows[0].pass));
                            if(bcrypt.compareSync(sendedpass,result.rows[0].pass)){
                                console.log("ログイン処理を開始します");
                                (usrDataSet(sendedmail,req))
                                .then(()=>{
                                    console.log("ユーザー："+sendedmail+"　でログインしました。")
                                    resolve();
                                })
                                .catch(e5 => console.error(e5));         
                            }else if(!(bcrypt.compareSync(sendedpass,result.rows[0].pass))){
                                res.redirect('/login'+'?loginerror=ログインが不正です');
                                reject("passerror");
                            }else{
                                console.error("不明な処理が行われました");
                            }
                        }else if(result.rows.length == 0){
                            console.log("該当メールアドレスがありません");
                            res.redirect('/login'+'?loginerror=メールアドレスが不正です');
                            reject("mailerror");
                        }else{
                            console.error("リザルトエラーです");
                        }
                    })
                    .catch(errs => console.error(errs));
            }
        })
    })
}

async function usrInsertRun(sendedmail,sendedpass){
    return new Promise((resolve,reject)=>{
        const hashedpass = hashtool.hashmodule.hashing(sendedpass);
        const querystring2 = "insert into userinfo (mail,pass) values (" +s_quatation+ sendedmail +s_quatation+"," +s_quatation+ hashedpass +s_quatation+")";
        pool.connect((er2, client2) =>{
            client2
                .query(querystring2)
                .then(result2 => {
                    console.log("INSERT：完了");
                    resolve(sendedmail);
                })
                .catch((e2) => {
                    console.log("INSERT：失敗");
                    console.error(e2.stack);
                    reject(e2);
                })
        })
    })
}


module.exports = router;