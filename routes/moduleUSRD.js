const pool = require("./pool.js");
const s_quatation = "'";
const db = require("../models/index.js");
const Op = db.Sequelize.Op;

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
        // const querystring3 = "select * from userinfo where mail=" +s_quatation+ sendedmail +s_quatation;

        db.Userinfo.findOne({
            where: {
                mail:{ [Op.eq]:sendedmail }
            }
        })
        .then(r => {
            console.log("THIS IS RESULT ROWS"+r);
            console.log("THISIS RESULTROWS[0].id:"+ r.id)
            req.session.usr_data = usrDataAdjust(r.id,r.calenddisplay,r.onselect,r.username,r.profileimg,r.icon,r.watchtime,r.profiletxt)
            // fs.writeFileSync("./public/data/testdata.json",tablejson);
            console.log("seq:usrobj-Finished..");
            resolve();
        })
        .catch((e3)=>{
            console.error(e3);
            reject(e3);
        })
    })
}

module.exports = usrDataSet;