let express = require('express');
let router = express.Router();



router.get("/",(req,res)=>{
    res.render("formin",{
        title: "LOGFORM",
        content: "LOGIN/LOGOUT"
    });
});



router.post("/posts",(req,res)=>{
    const reqs = req.body["pass"];
    const data = {
        title: "reqs-content",
        content: reqs
    }
    console.log(data);
})

router.post("/setup",(req,res)=>{

    const sendedmail = req.body["mail"];
    const sendedpass = req.body["pass"];


    const data = {
        title: "setup-content",
        content: "a"
    }
    console.log(data);
})

module.exports = router;

function userSetupTest(mail){

}