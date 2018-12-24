const fs = require('fs');
let matchesData= JSON.parse(fs.readFileSync('data/matchesJSON.json')); 
let deliveriesData = JSON.parse(fs.readFileSync('data/deliveriesJSON.json')); 
let matchesId2015 = [];
let econData = {};
let econ= {};
let bowlers20 = [];
let econ20 = [];

matchesId2015 = matchesData.reduce((matchesId2015, match)=>{
    if(match.season==2015 && !matchesId2015.includes(match.id)){
        matchesId2015.push(match.id);
    }
    return matchesId2015;
},[]);

// console.log(matchesId2015);
econData = deliveriesData.reduce((econData,delivery)=>{
    if(matchesId2015.includes(delivery.match_id)){
        let isExtra=delivery.extra_runs>0?1:0;
        if(!econData.hasOwnProperty(delivery.bowler)){  
            econData[delivery.bowler]={"runs":parseInt(delivery.total_runs),
                                        "deliveries":1,
                                        "extras":isExtra
                                    };   
        }else{
            econData[delivery.bowler].runs=econData[delivery.bowler].runs+parseInt(delivery.total_runs);
            econData[delivery.bowler].deliveries++;
            econData[delivery.bowler].extras=econData[delivery.bowler].extras+isExtra;
        }
    }
    return econData;
},{});
// console.log(econData);

econ = Object.keys(econData).reduce((econ, econ_i)=>{
    econ[econ_i]=econData[econ_i].runs/((econData[econ_i].deliveries-econData[econ_i].extras)/6);    
    return econ;
},{});

bowlers20=Object.keys(econ).sort((a,b)=>{
    return econ[a]-econ[b];
}).slice(0,20);
// console.log(bowlers20);

econ20 = bowlers20.map((bowler)=> Number((econ[bowler]).toFixed(2)) );
// console.log(econ20);

module.exports = {
    bowlers20,
    econ20
}