// const pool = require("./pool.js");
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
            console.log("THIS IS ARTs RESULT LENGTH"+result.length);
            let artDataArray = [];
            for(let i=0;i<result.length;i++){
                console.log("THISIS RESULTROWS[i].id:"+ result[i].id)
                const newsawdate = new Date(result[i].sawdate);
                const shortsawdate = newsawdate.toLocaleDateString();
                const newonaired = new Date(result[i].sawdate);
                const shortonaired = newonaired.toLocaleDateString();

                const tart = artDataShape(result[i].id,result[i].title,result[i].thumbnail,shortsawdate,result[i].created,shortonaired,result[i].arttype,result[i].scale,result[i].ftxt);
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

        // const artsetstring = "select * from "+tablename;
        // pool.connect((er, client) =>{
        //     if(er){
        //         throw new Error(er);
        //     }else{
        //         client
        //             .query(artsetstring)
        //             .then(result => {
        //                 console.log("THIS IS RESULT ROWS LENGTH"+result.rows.length);
        //                 let artDataArray = [];
        //                 for(let i=0;i<result.rows.length;i++){
        //                     console.log("THISIS RESULTROWS[i].id:"+ result.rows[i].id)
        //                     const newsawdate = new Date(result.rows[i].sawdate);
        //                     const shortsawdate = newsawdate.toLocaleDateString();
        //                     const newonaired = new Date(result.rows[i].sawdate);
        //                     const shortonaired = newonaired.toLocaleDateString();

        //                     const tart = artDataShape(result.rows[i].id,result.rows[i].title,result.rows[i].thumbnail,shortsawdate,result.rows[i].created,shortonaired,result.rows[i].arttype,result.rows[i].scale,result.rows[i].ftxt);
        //                     artDataArray.push(tart);
        //                 }
        //                 console.log(artDataArray);
        //                 req.session.art_data = artDataArray;
                        
        //                 console.log("artobj-Finished..");
        //                 resolve();
        //             })
        //             .catch((e3)=>{
        //                 console.error(e3);
        //                 reject(e3);
        //             })
        //     }
        // })
    })
}

module.exports = artDataSet;