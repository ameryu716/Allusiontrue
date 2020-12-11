let express = require('express');
let router = express.Router();

router.get("/",(req,res)=>{
    res.render("cardlist",{
        title: "CARD",
        content: "CARDLIST"
    });
});

module.exports = router;