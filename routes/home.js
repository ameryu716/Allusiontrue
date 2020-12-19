let express = require('express');
let router = express.Router();
const multer = require("multer");
const path = require("path");
const pool = require('./pool.js');
const usrDataSet = require('./moduleUSRD.js');
const artDataSet = require('./moduleARTD.js');
const s_quatation = "'";

const storage =  multer.diskStorage({
    destination: "./public/images/imgfiles",
    filename: function(req, file, cb) {
      cb(null, file.originalname)
    }
  })

const uploader = multer({ storage });
// const usrimguploader = multer({dest: './imgfiles',}).single('pimg');

router.get("/",(req,res)=>{
    console.log( "mailfound:" + req.session.mail !== undefined);
    console.log( "loginis:" + req.session.login);
    if(req.session.mail !== undefined && req.session.login){
        res.render("home",{
            title: "HOME",
            content: "GOYUKKURI",
        });
    }else{
        res.redirect('/login');
    }
});

router.post("/artentry",uploader.single('imguploads'),(req,res)=>{
    //作品登録
    if(req.session.mail !== undefined && req.session.login){
        const thumbnail = path.join("./","images/imgfiles",req.file.originalname);
        const title = req.body['title'];
        const type = req.body['arttype'];
        let scale = req.body['artscale'];
        if(scale==""){
            scale = 0;
        }
        let sawdate = req.body['when'];
        if(sawdate == ""){
            sawdate = "2020/01/01";
        }
        let onaired = req.body['onaired'];
        if(onaired == ""){
            onaired = "2020/01/01";
        }
        const created = req.body['created'];
        const ftxt = req.body['ftxt'];

        const tablename = "arttable"+ req.session.usr_data.id;
        //select user特定 
        // const artSearchString = "select title from "+tablename;
        // console.log("THISIS QUERY:"+artSearchString);

        pool.connect((err, client)=>{
            if (err){
                console.log("コネクトエラーです");
                throw new Error(err);
            }else{
                artInsert(tablename,title,type,scale,sawdate,onaired,created,thumbnail,ftxt)
                .then(r =>{
                    artDataSet(tablename,req)
                    .then(r3 => res.redirect("/home"));
                })
            }
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

async function artInsert(tablename,title,type,scale,sawdate,onaired,created,thumbnail,ftxt){
    return new Promise((resolve,reject)=>{
        const insertstring = "insert into "+tablename+" (title,arttype,scale,sawdate,onaired,created,thumbnail,ftxt) values (" +s_quatation+ title +s_quatation+","+s_quatation+ type +s_quatation+","+scale+","+s_quatation+ sawdate +s_quatation+","+s_quatation+ onaired +s_quatation+","+s_quatation+ created +s_quatation+","+s_quatation+ thumbnail +s_quatation+","+s_quatation+ ftxt +s_quatation+")";
        console.log("ARTINSERT STRING:"+insertstring);
        pool.connect((e, client2) =>{
            client2
                .query(insertstring)
                .then(r => {
                    console.log("作品登録：成功");
                    resolve(tablename);
                })
                .catch((e2) => {
                    console.log("作品登録：失敗");
                    console.error(e2.stack);
                    reject(e2);
                })
        })
    })
}













router.post("/usrget",(req,res)=>{
    //ユーザー情報取得
    console.log("THISISID:"+req.session.usr_data.id);
    console.log(req.session.usr_data);
    res.json(req.session.usr_data);
})

router.post("/setting",uploader.single('pimg'),(req,res)=>{
    console.log(req.file.path);
    let pimg = path.join("./","images/imgfiles",req.file.originalname);
    
    const usrname = req.body['usrname'];
    const iconselect = req.body['iconselect'];
    // let pimg = req.body['pimg'];
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
    pool.connect((er, client) =>{
        if(er){
            throw new Error(er);
        }else{
            client
                .query(querystring)
                .then(result3 => {
                    usrDataSet(req.session.mail,req)
                    .then(r => {
                        console.log("usrobj-Finished..");
                        res.redirect("/home");
                    })
                })
                .catch((e3)=>{
                    console.error(e3);
                })
        }
    })
    // console.log(usrname,iconclass,pimg,ftxt);
})




module.exports = router;