let sql = require('../sql');
let db=sql.db;

let econData = {};
let econ= {};
let bowlers20 = [];
let econ20 = [];

async function getEconData(){
    return new Promise((resolve, reject)=>{
        let query = `select bowler, total_runs, extra_runs from deliveries where match_id IN (select distinct id from matches where season="2015")`
        db.query(query, (err, res)=>{
            if(err){
                console.error('sql fail: query4.1');
                throw err;
            }
            econData = res.reduce((econData,delivery)=>{
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
        });  
    });
}
async function getEcon() {
        econData = await getEconData();
        econ = Object.keys(econData).reduce((econ, econ_i)=>{
            econ[econ_i]=econData[econ_i].runs/((econData[econ_i].deliveries-econData[econ_i].extras)/6);    
            return econ;
        },{});
        return Promise.resolve(econ);
}

async function getBowlers20(){
    econ = await getEcon();
    bowlers20=Object.keys(econ).sort((a,b)=>{
        return econ[a]-econ[b];
    }).slice(0,20);
    return Promise.resolve(bowlers20);
}

async function getEcon20(){
    let bowlers20= await getBowlers20();
    econ20 = bowlers20.map((bowler)=> Number((econ[bowler]).toFixed(2)) );
    return Promise.resolve(econ20);
}

module.exports = {
    getBowlers20,
    getEcon20
}