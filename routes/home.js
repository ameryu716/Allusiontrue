let express = require('express');
let router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const pool = require('./pool.js');
const usrDataSet = require('./moduleUSRD.js');
const artDataSet = require('./moduleARTD.js');
const s_quatation = "'";
const pg = require('pg');
pg.defaults.ssl = true;
const db = require("../models/index.js");
const Op = db.Sequelize.Op;
// const Sequelize = require('sequelize');
// const sequelize = new Sequelize('');

// const client = new Client({
// // pool: pool,
//     connectionString: process.env.key_db,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

// client.connect();


// const storage =  multer.diskStorage({
//     destination: "./public/images/imgfiles",
//     filename: function(req, file, cb) {
//       cb(null, file.originalname)
//     }
//   })

// const uploader = multer({ storage });

router.get("/",(req,res)=>{
    console.log( "mailfound:" + req.session.mail !== undefined);
    console.log( "loginis:" + req.session.login);
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

router.get("/usrtest",(req,res)=>{
    console.log("usrtest22");
        db.Userinfo.findAll({
            where: {
                mail:{ [Op.eq]:"ryuto@mail.com" }
            }
        })
        .then(r =>{
            console.log(r);
            console.log("rleng:"+r.length);
            console.log("r0:"+r[0]);
            console.log("r0undefined?:"+(r[0]==undefined))
            console.log("r0datav"+r[0].dataValues)
            console.log("r0data_va_pass:"+r[0].dataValues.pass)
            console.log("r0pass:"+r[0].pass);
            //-------------------------
            console.log("null?"+(r == null));
            res.render('usrindex',{
                title: "test",
                content: r
            });
        })
});

router.get("/arttest",(req,res)=>{
    console.log("artest22");

        db.sequelize.sync()
        .then(()=> db.Arttable.delete())
        .then(r =>{
            console.log("rleng:"+r.length);
            console.log(r);
            res.render('artindex',{
                title: "test",
                content: r
            });
        })
});
//=>>>>art処理

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

        artInsert(req.session.usr_data.id,title,type,scale,sawdate,onaired,created,thumbnail,ftxt)
        .then(r =>{
            artDataSet(r,req)
            .then(r3 => res.redirect("/"));
        })

    }else{
        res.redirect('/login');
    }
    
})

router.post("/artget",(req,res)=>{
    //作品情報取得
    console.log("ARTDATA"+req.session.art_data);
    res.json(req.session.art_data);
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









router.post("/usrget",(req,res)=>{
    //ユーザー情報取得
    console.log("THISISID:"+req.session.usr_data.id);
    console.log(req.session.usr_data);
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

    const querystring = "update userinfo set username = "+s_quatation+usrname+s_quatation+",icon = "+s_quatation+ iconclass +s_quatation+",profileimg = "+s_quatation+ pimg +s_quatation+",profiletxt = "+s_quatation+ ftxt +s_quatation+" where mail=" +s_quatation+ req.session.mail +s_quatation;
    console.log(querystring);

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