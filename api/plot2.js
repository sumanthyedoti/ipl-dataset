const fs = require('fs');
let matches= JSON.parse(fs.readFileSync('data/matchesJSON.json')); 
let yearlyWins={};
let teams=[];
/*assaign teams names */
for(let match of matches){
    if(!teams.includes(match.team1)) teams.push(match.team1);
}
// console.log(teams);
for(let match of matches) {
    if(!yearlyWins.hasOwnProperty(match.season)){
        yearlyWins[match.season]={};
    } 
    if(!yearlyWins[match.season].hasOwnProperty([match.winner])){
        yearlyWins[match.season][match.winner]=1;
    }else{
        yearlyWins[match.season][match.winner]++;
    }
}
// console.log(yearlyWins);

/*array of objs for 'series'*/
let matchesWon=[];
    for(let team of teams){ //teams
    let wonMatchesObj={};
    wonMatchesObj.name=team;
    let wonMatches=[];
    for(let year of Object.keys(yearlyWins)){  //years
        if(!yearlyWins[year].hasOwnProperty([team])){
            wonMatches.push("");
        }else{
            wonMatches.push(yearlyWins[year][team]);
        }
    }
    wonMatchesObj.data=wonMatches;
    matchesWon.push(wonMatchesObj);
}
// console.log(matchesWon);

module.exports={
    yearlyWins,
    matchesWon
}