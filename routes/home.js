let express = require('express');
let router = express.Router();
const usrDataSet = require('./moduleUSRD.js');
const artDataSet = require('./moduleARTD.js');
const s_quatation = "'";
// const pg = require('pg');
// pg.defaults.ssl = true;
const db = require("../models/index.js");
const Op = db.Sequelize.Op;


router.get("/",(req,res)=>{
    //console.log( "mailfound:" + req.session.mail !== undefined);
    //console.log( "loginis:" + req.session.login);
    if(req.session.mail !== undefined && req.session.login){
        
       console.log("HOME!!");
        res.render("home",{
            title: "HOME",
            content: "GOYUKKURI",
        });
        
    }else{
        res.redirect('/login');
    }
});
//=>>>>art処理

router.post("/artget",(req,res)=>{
    //作品情報取得
    //console.log("ARTDATA"+req.session.art_data);
    res.json(req.session.art_data);
})

router.post("/artentry",(req,res)=>{
    //作品登録
    if((req.session.mail !== undefined) && req.session.login){
        const thumbnail = req.body['artimgsrc']
        const title = req.body['title'];
        const type = req.body['arttype'];
        let scale = req.body['artscale'];
        if(scale==""){
            scale = 0;
        }
        let sawdate = req.body['when'];
        if(sawdate == ""){
            sawdate = "2000/01/01";
        }
        let onaired = req.body['onaired'];
        if(onaired == ""){
            onaired = "2000/01/01";
        }
        const created = req.body['created'];
        const ftxt = req.body['ftxt'];
        const editmode = req.body['editmode'];
        const editid = req.body['editid'];

        if(editmode == 9999){
            //新規挿入モード
            artInsert(req.session.usr_data.id,title,type,scale,sawdate,onaired,created,thumbnail,ftxt)
            .then(r =>{
                artDataSet(r,req)
                .then(r3 => res.redirect("/"));
            })
        }else{
            //作品編集モード
            artUpdate(editid,title,type,scale,sawdate,onaired,created,thumbnail,ftxt,req.session.usr_data.id)
            .then(r =>{
                artDataSet(r,req)
                .then(r3 => res.redirect("/"));
            })
            .catch(e => console.error(e));
        }
    }else{
        res.redirect('/login');
    }  
})

async function artInsert(user_id,title,type,scale,sawdate,onaired,created,thumbnail,ftxt){
    return new Promise((resolve,reject)=>{
        db.sequelize.sync()
        .then(()=> db.Arttable.create({
            title: title,
            arttype: type,
            scale: scale,
            sawdate: sawdate,
            onaired: onaired,
            created: created,
            thumbnail: thumbnail,
            ftxt: ftxt,
            user_id: user_id,
        }))
        .then(r => {
            console.log("作品登録：成功");
            resolve(user_id);
        })
        .catch((e2) => {
            console.log("作品登録：失敗");
            console.error(e2.stack);
            reject(e2);
        })
    })
}

async function artUpdate(editid,title,type,scale,sawdate,onaired,created,thumbnail,ftxt,user_id){
    return new Promise((resolve,reject) => {
        db.sequelize.sync()
        .then(()=> db.Arttable.update({
            title: title,
            arttype: type,
            scale: scale,
            sawdate: sawdate,
            onaired: onaired,
            created: created,
            thumbnail: thumbnail,
            ftxt: ftxt,
            user_id: user_id,
        },
        {
            where: {
                id: {[Op.eq]:editid}
            }
        }
        ))
        .then(r => {
            console.log("作品編集：成功");
            resolve(user_id);
        })
        .catch((e2) => {
            console.log("作品編集：失敗");
            console.error(e2.stack);
            reject(e2);
        })
    })
}

router.post("/artdelete",(req,res)=>{
    db.sequelize.sync()
    .then(()=> db.Arttable.destroy({
        where: {
            id:{ [Op.eq]:req.body.artid }
        }
    }))
    .then(r => {
        console.log("作品削除：成功");
        artDataSet(req.session.usr_data.id,req)
        .then(() => res.end());
    })
    .catch((e2) => {
        console.log("作品削除：失敗");
        console.error(e2.stack);
    })
})

router.post("/usrget",(req,res)=>{
    //ユーザー情報取得
    // console.log("THISISID:"+req.session.usr_data.id);
    // console.log(req.session.usr_data);
    res.json(req.session.usr_data);
})

router.post("/setting",(req,res)=>{
    if(req.session.mail == undefined){
        return res.redirect("/login");
    }
    console.log(req.body['pimg']);
    let pimg = req.body['imgsrcstr'];
    const usrname = req.body['usrname'];
    const iconselect = req.body['iconselect'];
    const ftxt = req.body['ftxt'];
    let iconclass = "";
    switch(iconselect){
        case "1":
            iconclass = 'fa-atlas';
            break;
        case "2":
            iconclass = 'fa-broom';
            break;
        case "3":
            iconclass = 'fa-bolt';
            break;
        case "4":
            iconclass = 'fa-crow';
            break;
    }

    db.sequelize.sync()
        .then(()=> db.Userinfo.update({
            username: usrname,
            icon: iconclass,
            profileimg: pimg,
            profiletxt: ftxt
        },
        {
            where: {
                mail: req.session.mail
            }
        }))
        .then(() => {
            usrDataSet(req.session.mail,req)
            .then(r => {
                console.log("usrobj-Finished..");
                res.redirect("/");
            })
        })
        .catch((e3)=>{
            console.error(e3);
        })
})

module.exports = router;