let sql = require('../sql');
let db=sql.db;
// let matchesInYear ={};

function getData(){
    return new Promise((resolve, reject)=>{
        db.query('select season from matches', (err, res)=>{
            if(err){
                console.error('sql fail: query1.1');
                reject(err);
            }
            let matchesInYear = res.reduce((matchesInYear, match)=>{
                if (matchesInYear.hasOwnProperty(match.season)) {
                    matchesInYear[match.season]++;
                } else {
                    matchesInYear[match.season] = 1;
                }
                return matchesInYear;
            },{});
            resolve(matchesInYear);
        });
    });
}
module.exports={
    getData
}





