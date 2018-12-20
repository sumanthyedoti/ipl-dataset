const fs = require('fs');
let matches = JSON.parse(fs.readFileSync('data/matchesJSON.json')); 
let matchesInYear = {};
// console.log(matches);
for(match of matches){
    if(matchesInYear.hasOwnProperty(match.season)){
        matchesInYear[match.season]++;
    } else {
        matchesInYear[match.season]=1;
    }
}
// console.log(matchesInYear);

module.exports = {
    matchesInYear
}