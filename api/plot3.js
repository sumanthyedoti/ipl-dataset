const fs = require('fs');
let matchesData= JSON.parse(fs.readFileSync('data/matchesJSON.json')); 
let deliveriesData = JSON.parse(fs.readFileSync('data/deliveriesJSON.json')); 
let matchesId2016 = [];
let extraRuns = {};

matchesId2016 = matchesData.reduce((matchesId2016, match)=>{
    if(match.season==2016 && !matchesId2016.includes(match.id)){
        matchesId2016.push(match.id);
    }
    return matchesId2016;
},[]);
// console.log(matchesId2016);


extraRuns= deliveriesData.reduce((extraRuns, delivery)=>{
    if(matchesId2016.includes(delivery.match_id)){
        if(!extraRuns.hasOwnProperty(delivery.bowling_team)){
            extraRuns[delivery.bowling_team]=parseInt(delivery.extra_runs);
        }else{
            extraRuns[delivery.bowling_team]+=parseInt(delivery.extra_runs);
        }
    }
    return extraRuns;
},{});

// console.log(extraRuns);
module.exports = {
    extraRuns
}