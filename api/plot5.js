let sql = require('../sql');
let db=sql.db;

let player = 'SR Watson';
// let SRWatson = {};
// let seasonIds = {};
let runsTargetFlag = {
    match: 0,
    runs: 0,
    fifties: 0,
    hundereds: 0
};
function getSeasonIds(){
    return new Promise((resolve, reject)=>{
        let query = `select id, season from matches`;
        db.query(query, (err, res)=>{
            seasonIds = res.reduce((seasonIds, match)=>{
                if (!seasonIds.hasOwnProperty(match.season)) {
                    seasonIds[match.season] = [match.id];
                } else {
                    seasonIds[match.season].push(match.id);
                }
                return seasonIds;
            },{})
            resolve(seasonIds);
        });  
    });
}
async function getPlayerData(){
    return new Promise(async(resolve, reject)=>{
        let seasonIds = await getSeasonIds();
        /** inculde this function here */
            function getYearFromId(delivery) {
                for (season in seasonIds) {
                    if (seasonIds[season].includes(delivery.match_id)) {
                        return season;
                    }
                }
            }
        // let query = `select match_id, batsman, bowler, total_runs, extra_runs from deliveries where batsman='${player}' OR bowler='${player}'`;
        let query = `select match_id, batsman, bowler, total_runs, extra_runs from deliveries`
        db.query(query, (err, res)=>{
            let SRWatson = res.reduce((SRWatson, delivery)=>{
                let year = getYearFromId(delivery);
                /* ********** */
                if (!SRWatson.hasOwnProperty(year)) {
                    SRWatson[year] = {
                        ballsFaced: 0,
                        runs: 0,
                        halfCenturies: 0,
                        centuries: 0,
                        bowling: {
                            "runs": 0,
                            "deliveries": 0,
                            "extras": 0
                        }
                    };
                }
                if (delivery.batsman == player) {
                    SRWatson[year].runs += parseInt(delivery.total_runs);
                    SRWatson[year].ballsFaced += 1;
            
                    if (runsTargetFlag.match != delivery.match_id) {
                        SRWatson[year].halfCenturies += parseInt(parseInt(runsTargetFlag.runs) / 50);
                        let centuries = parseInt(parseInt(runsTargetFlag.runs) / 100)
                        if (centuries > 0) {
                            SRWatson[year].centuries += centuries;
                            SRWatson[year].halfCenturies -= (2 * centuries);
                        }
                        runsTargetFlag.match = delivery.match_id;
                        runsTargetFlag.runs = 0;
                        runsTargetFlag.fifties = 0;
                        runsTargetFlag.hundereds = 0;
                    } else {
                        runsTargetFlag.runs += parseInt(delivery.total_runs);
                        runsTargetFlag.fifties += parseInt(parseInt(runsTargetFlag.runs) / 50);
                        runsTargetFlag.hundereds += parseInt(parseInt(runsTargetFlag.runs) / 100);
            
                    }
                }
                else if (delivery.bowler == player) {
                    let isExtra = delivery.extra_runs > 0 ? 1 : 0;
                    SRWatson[year].bowling.runs += parseInt(delivery.total_runs);
                    SRWatson[year].bowling.deliveries++;
                    SRWatson[year].bowling.extras += parseInt(delivery.extra_runs);
                }
                return SRWatson;
            },{});
            resolve(SRWatson);
        });     // db.query
    });     // Promise     
}
// getPlayerData().then((data)=>console.log(data))

module.exports = {
    getPlayerData
}
