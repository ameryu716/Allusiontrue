const bcrypt = require('bcrypt');

const pool = require("./pool.js");

const hashmodule = {
    hashing: function(pass){
        const hashedpass = bcrypt.hashSync(pass,10);
        return hashedpass;
    },
    maildoubling: function(mail){
        const s_quatation = "'";
        const querystring = "select count(*) from userinfo where mail="+s_quatation+mail+s_quatation + "";
        console.log("THISIS QUERY:"+querystring);
        pool.connect( async (err, client)=>{
            if (await err){
                console.log("コネクトエラー");
                return false;
            }else{
                await client.query(querystring,(err,result)=>{
                    console.log("TI RESULT:"+result.rows[0].count);
                    // console.log("TI RESULT ROWS:"+result.rows);
                     if(result.rows[0].count == 0){
                        console.log("検索結果「０」");
                        return true;
                    }else{
                        console.log("検索結果「1」以上")
                        return false;
                    }
                });
            }
        })
    },
    userset: function(mail,pass) {
        const s_quatation = "'";
        const querystring = "insert into userinfo (mail,pass) values (" +s_quatation+ mail +s_quatation+"," +s_quatation+ pass +s_quatation+")";
        console.log(querystring);
        pool.connect((err, client)=>{
            console.log("err:"+err);
            if(err){
                console.log("iferr:"+err);
                return false;
            }else{
                client.query(querystring,(err,result)=>{
                    console.log("queryresult:"+result);
                });
            }
        })
    },
    passequal: function(sendedmail,sendedpass) {

        const s_quatation = "'";
        const querystring = "select pass from userinfo where mail=(" +s_quatation+ sendedmail +s_quatation+")";
        console.log(querystring);
        pool.connect((err, client)=>{
            console.log("err:"+err);
            if(err){
                console.log("iferr:"+err);
                return false;
            }else{
                client
                    .query(querystring)
                    .then(result => {
                        console.log("queryresult:"+result);
                        console.log("真偽："+bcrypt.compareSync(sendedpass,result.rows[0].pass));
                        return (bcrypt.compareSync(sendedpass,result.rows[0].pass));
                    })
                    .catch(errs => console.error(errs));
            }
        })
        //pass比べる
        //return
        //fswrite

    }
};

exports.hashmodule = hashmodule;