let express = require('express');
let router = express.Router();

router.get("/",(req,res)=>{
    res.render("artcard",{
        title: "ART",
        content: "ARTCONT"
    });
});

router.post("/",(req,res)=>{
    console.log("POSTしましたね？私は知っています");
})

module.exports = router;