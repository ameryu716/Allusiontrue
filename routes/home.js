let express = require('express');
let router = express.Router();

router.get("/",(req,res)=>{
    res.set('body',[req.session.usr_data,req.session.art_data]);
    res.render("home",{
        title: "HOME",
        content: "GOYUKKURI",
        data: [req.session.usr_data,req.session.art_data]
    });
});

router.post("/artentry",(req,res)=>{
    //作品登録
    
})

router.post("/artget",(req,res)=>{
    //作品情報取得
    res.send({resart: req.session.artdata});
})

router.post("/usrget",(req,res)=>{
    //ユーザー情報取得
    res.send({resusr: req.session.usr_data});
})



module.exports = router;