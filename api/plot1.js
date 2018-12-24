let sql = require('../sql');
let db=sql.db;
let matchesInYear ={};
// matchesInYear = matches.reduce((matchesInYear, match)=>{
//     if (matchesInYear.hasOwnProperty(match.season)) {
//         matchesInYear[match.season]++;
//     } else {
//         matchesInYear[match.season] = 1;
//     }
//     return matchesInYear;
// },{});
function getData(){
    return new Promise((resolve, reject)=>{
        db.query('select season from matches', (err, res)=>{
            if(err){
                console.error('sql fail: query1.1');
                throw err;
            }
            // console.log(res); 
            matchesInYear = res.reduce((matchesInYear, match)=>{
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





