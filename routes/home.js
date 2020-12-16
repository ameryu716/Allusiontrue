let express = require('express');
let router = express.Router();

router.get("/",(req,res)=>{
    res.render("home",{
        title: "HOME",
        content: "GOYUKKURI"
    });
});

router.post("/artentry",(req,res)=>{
    console.log(req.query);
})

module.exports = router;