let sql = require('../sql');
let db=sql.db;

let extraRuns = {};

 function getExtraRuns(){
    return new Promise((resolve, reject)=>{
        let query = `select bowling_team, extra_runs from deliveries where match_id IN (select distinct id from matches where season="2016")`
        db.query(query, (err, res)=>{
            if(err){
                console.error('sql fail: query3.1');
                throw err;
            }
            extraRuns= res.reduce((extraRuns, delivery)=>{
                    if(!extraRuns.hasOwnProperty(delivery.bowling_team)){
                        extraRuns[delivery.bowling_team]=parseInt(delivery.extra_runs);
                    }else{
                        extraRuns[delivery.bowling_team]+=parseInt(delivery.extra_runs);
                    }
                return extraRuns;
            },{});
            resolve(extraRuns);
        });  
    });
}

module.exports = {
    getExtraRuns
}