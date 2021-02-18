const db = require("../models/index.js");
const Op = db.Sequelize.Op;

function artDataShape(id,title,thumbnail,sawdate,created,onaired,arttype,artscale,ftxt){
    // const artArray = [];
    const addobj = {
         id: id,
         title: title,
         thumbnail: thumbnail,
         sawdate: sawdate,
         creater: created,
         onaired: onaired,
         conttype: arttype,
         scale: artscale,
         freetext: ftxt,
    }
    return addobj;
}

async function artDataSet(userid,req){
    return new Promise((resolve,reject)=>{

        db.Arttable.findAll({
            where: {
                user_id:{ [Op.eq]:userid }
            }
        })
        .then(result => {
            //console.log("THIS IS ARTs RESULT LENGTH"+result.length);
            let artDataArray = [];
            for(let i=0;i<result.length;i++){
                //console.log("THISIS RESULTROWS[i].id:"+ result[i].id)
                const newsawdate = new Date(result[i].sawdate);
                const shortsawdate = newsawdate.toLocaleDateString();
                const newonaired = new Date(result[i].onaired);
                const shortonaired = newonaired.toLocaleDateString();
                const tart = artDataShape(result[i].id,result[i].title,result[i].thumbnail,shortsawdate,result[i].created,shortonaired,result[i].type,result[i].scale,result[i].ftxt);
                artDataArray.push(tart);
            }
            console.log(artDataArray);
            req.session.art_data = artDataArray;
            
            console.log("artobj-Finished..");
            resolve();
        })
        .catch((e3)=>{
            console.error(e3);
            reject(e3);
        })
    })
}

module.exports = artDataSet;