const fs = require("fs");
let matches = JSON.parse(fs.readFileSync("data/matchesJSON.json"));
let matchesInYear = {};
matchesInYear = matches.reduce((matchesInYear, match)=>{
    if (matchesInYear.hasOwnProperty(match.season)) {
        matchesInYear[match.season]++;
    } else {
        matchesInYear[match.season] = 1;
    }
    return matchesInYear;
},{});
// console.log(matchesInYear);

module.exports = {
    matchesInYear
}