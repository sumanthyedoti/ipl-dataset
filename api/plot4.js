const fs = require('fs');
let matchesData= JSON.parse(fs.readFileSync('data/matchesJSON.json')); 
let matchesId2015=[];
for(let bowling of matchesData){
    if(bowling.season==2015 && !matchesId2015.includes(bowling.id)){
        matchesId2015.push(bowling.id);
    }
}
//console.log(matchesId2015);
let deliveriesData = JSON.parse(fs.readFileSync('data/deliveriesJSON.json')); 
let econData={};
for(let delivery of deliveriesData){
    if(matchesId2015.includes(delivery.match_id)){
        let isExtra=delivery.extra_runs>0?1:0;
        if(!econData.hasOwnProperty(delivery.bowler)){  
            econData[delivery.bowler]={"runs":parseInt(delivery.total_runs),
                                        "deliveries":1,
                                        "extras":isExtra};   
        }else{
            econData[delivery.bowler].runs=econData[delivery.bowler].runs+parseInt(delivery.total_runs);
            econData[delivery.bowler].deliveries++;
            econData[delivery.bowler].extras=econData[delivery.bowler].extras+isExtra;
        }
    }
}
// console.log(econData);

let econ={}
for(let econ_i in econData){
    econ[econ_i]=econData[econ_i].runs/((econData[econ_i].deliveries-econData[econ_i].extras)/6);
}

let bowlers20=Object.keys(econ).sort((a,b)=>{
    return econ[a]-econ[b];
}).slice(0,20);
console.log(bowlers20);

let econ20=[];
for(bowler of bowlers20){
    econ20.push(Number((econ[bowler]).toFixed(2)));
}
// console.log(econ20);

module.exports = {
    bowlers20,
    econ20
}