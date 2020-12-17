let express = require('express');
let router = express.Router();

router.get("/",(req,res)=>{
    if(req.session.login){
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

router.post("/setting",(req,res)=>{
    const usrname = req.body['usrname'];
    const iconselect = req.body['iconselect'];
    const pimg = req.body['pimg'];
    const ftxt = req.body['ftxt'];
    console.log(usrname,iconselect,pimg,ftxt);
    res.redirect("/home");
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