const pool = require("./pool.js");
const s_quatation = "'";

function usrDataAdjust(id,cd,ons,usr,pim,icon,wtime,ptxt) {
    const rtobj = {
        id: id,
        calendDisplay: cd,
        onselect: ons,
        username: usr,
        profileimg: pim,
        icon: icon,
        watchtime: wtime,
        profiletext: ptxt,
    }
    return rtobj;
}

async function usrDataSet(sendedmail,req){
    return new Promise((resolve,reject)=>{
        const querystring3 = "select * from userinfo where mail=" +s_quatation+ sendedmail +s_quatation;
        pool.connect((er, client) =>{
            if(er){
                throw new Error(er);
            }else{
                client
                    .query(querystring3)
                    .then(result3 => {
                        console.log("THIS IS RESULT ROWS"+result3);
                        console.log("THISIS RESULTROWS[0].id:"+ result3.rows[0].id)
                        req.session.usr_data = usrDataAdjust(result3.rows[0].id,result3.rows[0].calenddisplay,result3.rows[0].onselect,result3.rows[0].username,result3.rows[0].profileimg,result3.rows[0].icon,result3.rows[0].watchtime,result3.rows[0].profiletxt)
                        // fs.writeFileSync("./public/data/testdata.json",tablejson);
                        console.log("usrobj-Finished..");
                        resolve();
                    })
                    .catch((e3)=>{
                        console.error(e3);
                        reject(e3);
                    })
            }
        })
    })
}

module.exports = usrDataSet;