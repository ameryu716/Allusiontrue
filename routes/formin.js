let express = require('express');
let router = express.Router();
let pg = require('pg');
const bcrypt = require('bcrypt');

import {hashing} from './hashModule';


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
})



function userSetupTest(mail){
    // XSSたいさく
    hashing(mail);
}

router.get('/tester',(req,res)=>{
    let pool = new pg.Pool({
        database: '',
        user: '',
        password: '',
        host: '',
        port: 0,
    });
    pool.connect((err, client)=>{
        if(err){
            console.log(err);
            return false;
        }else{
            cliant.query('select * from userinfo',(err,result)=>{
                res.render('index', {
                    title: 'Express',
                    datas: result.rows[0].mail,
                  });
                console.log(result);
            });
        }
    });
})


module.exports = router;