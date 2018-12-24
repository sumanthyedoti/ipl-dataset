let sql = require('../sql');
let db=sql.db;

// let teams = [];
// let yearlyWins = {};

function getTeams(){
    return new Promise((resolve, reject)=>{
        let query = 'select distinct team1 from matches'
        db.query(query, (err, res)=>{
            if(err){
                console.error('sql fail: query2.1');
                reject(err.sqlMessage);
            }
            else{
                let teams = res.reduce((teams, match)=>{
                    if(!teams.includes(match.team1)) teams.push(match.team1);
                    return teams;
                },[]);
                resolve(teams);
            }
        });  
    });
}

function getYearlyWins(){
    return new Promise((resolve, reject)=>{
        let query = 'select season, winner from matches'
        db.query(query, (err, res)=>{
            if(err){
                console.error('sql fail: query2.2');
                reject(err.sqlMessage);
            }
            let yearlyWins= res.reduce((yearlyWins,match)=>{
                if(!yearlyWins.hasOwnProperty(match.season)){
                    yearlyWins[match.season]={};
                } 
                if(!yearlyWins[match.season].hasOwnProperty(match.winner)){
                    yearlyWins[match.season][match.winner]=1;
                }else{
                    yearlyWins[match.season][match.winner]++;
                }
                return yearlyWins;
            },{});
            resolve(yearlyWins);
        });  
    });
}

module.exports={
    getTeams,
    getYearlyWins
}