let express = require('express');
let router = express.Router();

router.get("/",(req,res)=>{
    res.render("formin",{
        title: "LOGFORM",
        content: "LOGIN/LOGOUT"
    });
});

module.exports = router;