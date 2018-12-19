const csv = require('csv-parser');
const fs = require('fs');
const matchesJSON = [];
const deliveriesJSON = [];
// debugger
fs.createReadStream("./data/matches.csv")
  .pipe(csv())
  .on('data',(data) => matchesJSON.push(data))
  .on('end', () => {
  //console.log(matchesJSON); 
  fs.writeFileSync("./data/matchesJSON.json",JSON.stringify(matchesJSON));
  });

fs.createReadStream("./data/deliveries.csv")
.pipe(csv())
.on('data',(data) => deliveriesJSON.push(data))
.on('end', () => {
  // console.log(deliveriesJSON);
  fs.writeFileSync("./data/deliveriesJSON.json",JSON.stringify(deliveriesJSON));
}); 