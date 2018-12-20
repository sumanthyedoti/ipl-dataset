const fs = require('fs');
let matchesData= JSON.parse(fs.readFileSync('data/matchesJSON.json')); 
let matchesId2016=[];
for(let match of matchesData){
    if(match.season==2016 && !matchesId2016.includes(match.id)){
        matchesId2016.push(match.id);
    }
}

let deliveriesData = JSON.parse(fs.readFileSync('data/deliveriesJSON.json')); 
let extraRuns={};
for(let delivery of deliveriesData){
    if(matchesId2016.includes(delivery.match_id)){
        //console.log(delivery);
        if(!extraRuns.hasOwnProperty(delivery.bowling_team)){
            extraRuns[delivery.bowling_team]=parseInt(delivery.extra_runs);
        }else{
            extraRuns[delivery.bowling_team]+=parseInt(delivery.extra_runs);
        }
    }
}
console.log(extraRuns);
module.exports = {
    extraRuns
}