let express = require('express');
let router = express.Router();
const multer = require("multer");
const path = require("path");
const pool = require('./pool.js');
const usrDataSet = require('./moduleUSRD.js');
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

router.post("/artentry",(req,res)=>{
    //作品登録
    console.log(req.body['ftxt']);
    res.redirect("/home");
})

router.post("/artget",(req,res)=>{
    //作品情報取得
    //{resart: req.session.artdata}
    res.send(req.session.art_data);
})

router.post("/usrget",(req,res)=>{
    //ユーザー情報取得
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

    console.log(usrname,iconclass,pimg,ftxt);
    
})

function artDataShape(id,title,thumbnail,sawdate,created,onaired,arttype,artscale,ftxt){
    // const artArray = [];
    const addobj = {
         id: id,
         title: title,
         thumbnail: thumbnail,
         sawdate: sawdate,
         creater: created,
         onaired: onaired,
         conttype: arttype,
         scale: artscale,
         freetext: ftxt,
    }
    return addobj;
}




module.exports = router;