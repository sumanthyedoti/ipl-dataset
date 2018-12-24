let sql = require('../sql');
let db=sql.db;

let teams = [];
let yearlyWins = {};
let matchesWon = [];

function getTeams(){
    return new Promise((resolve, reject)=>{
        let query = 'select distinct team1 from matches'
        db.query(query, (err, res)=>{
            if(err){
                console.error('sql fail: query2.1');
                throw err;
            }
            let teams = res.reduce((teams, match)=>{
                if(!teams.includes(match.team1)) teams.push(match.team1);
                return teams;
            },[]);
            resolve(teams);
        });  
    });
}
function getYearlyWins(){
    return new Promise((resolve, reject)=>{
        let query = 'select season, winner from matches'
        db.query(query, (err, res)=>{
            if(err){
                console.error('sql fail: query2.2');
                throw err;
            }
            yearlyWins= res.reduce((yearlyWins,match)=>{
                if(!yearlyWins.hasOwnProperty(match.season)){
                    yearlyWins[match.season]={};
                } 
                if(!yearlyWins[match.season].hasOwnProperty([match.winner])){
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
async function getMatchesWon(){
    teams = await getTeams();
    yearlyWins = await getYearlyWins();
    return new Promise((resolve, reject)=>{
        matchesWon = teams.reduce((matchesWon, team)=>{
            let wonMatchesObj={};
                wonMatchesObj.name=team;
                let wonMatches = Object.keys(yearlyWins).reduce((wonMatches, year)=>{
                    if(!yearlyWins[year].hasOwnProperty([team])){
                        wonMatches.push("");
                    }else{
                        wonMatches.push(yearlyWins[year][team]);
                    }
                    return wonMatches;
                },[])
            wonMatchesObj.data=wonMatches;
            matchesWon.push(wonMatchesObj);
            return matchesWon;
        },[]);
        resolve(matchesWon);
    });
}

module.exports={
    getYearlyWins,
    getMatchesWon
}