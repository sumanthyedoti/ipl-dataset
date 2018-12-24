let sql = require('../sql');
let db=sql.db;

// let econData = {};
// let econ= {};

function getEconData(){
    return new Promise((resolve, reject)=>{
        let query = `select bowler, total_runs, extra_runs from deliveries where match_id IN (select distinct id from matches where season="2015")`
        db.query(query, (err, res)=>{
            if(err){
                console.error('sql fail: query4.1');
                reject(err.sqlMessage);
            }else{
                let econData = res.reduce((econData,delivery)=>{
                    let isExtra=delivery.extra_runs>0?1:0;
                    if(!econData.hasOwnProperty(delivery.bowler)){  
                        econData[delivery.bowler]={"runs":parseInt(delivery.total_runs),
                                                    "deliveries":1,
                                                    "extras":isExtra
                                                };   
                    }else{
                        econData[delivery.bowler].runs=econData[delivery.bowler].runs+parseInt(delivery.total_runs);
                        econData[delivery.bowler].deliveries++;
                        econData[delivery.bowler].extras=econData[delivery.bowler].extras+isExtra;
                    }
                return econData;
            },{});
                resolve(econData);
            }
        });  
    });
}
async function getEcon() {
        econData = await getEconData();
        let econ = Object.keys(econData).reduce((econ, econ_i)=>{
            let blowlerEcon= econData[econ_i].runs/((econData[econ_i].deliveries-econData[econ_i].extras)/6);
            econ[econ_i]= parseFloat(Number(blowlerEcon).toFixed(2));
            return econ;
        },{});
        return Promise.resolve(econ);
}

module.exports = {
    getEcon
}