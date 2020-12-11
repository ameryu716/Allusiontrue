let express = require('express');
let router = express.Router();

router.get("/",(req,res)=>{
    res.render("artcard",{
        title: "ART",
        content: "ARTCONT"
    });
});

module.exports = router;