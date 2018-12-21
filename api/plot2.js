const fs = require('fs');
let matches= JSON.parse(fs.readFileSync('data/matchesJSON.json')); 
let teams = [];
let yearlyWins = {};
let matchesWon = [];
teams = matches.reduce((teams, match)=>{
    if(!teams.includes(match.team1)) teams.push(match.team1);
    return teams;
},[]);
// console.log(teams);

yearlyWins= matches.reduce((yearlyWins,match)=>{
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
// console.log(yearlyWins);

matchesWon = teams.reduce((matchesWon, team)=>{
    let wonMatchesObj={};
        wonMatchesObj.name=team.name;
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
},[])
// console.log(matchesWon);

module.exports={
    yearlyWins,
    matchesWon
}