let express = require('express');
let router = express.Router();

router.get("/",(req,res)=>{
    res.render("home",{
        title: "HOME",
        content: "GOYUKKURI"
    });
});

module.exports = router;