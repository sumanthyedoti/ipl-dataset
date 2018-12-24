const express = require('express');
const path = require('path');
const plot1 = require('./api/plot1');
const plot2 = require('./api/plot2');
const plot3 = require('./api/plot3');
const plot4 = require('./api/plot4');
const plot5 = require('./api/plot5');
const port = process.env.PORT || 3000;

let app = express();
app.use(express.static(__dirname+'/public'));
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});
app.get('/api/plot1',(req,res)=>{
    plot1.getData()
    .then((data)=> res.json(data));
});
app.get('/api/plot2', async(req,res)=>{
    // plot2.getMatchesWon()
    // .then((dataM)=> {
    //     plot2.getYearlyWins()
    //     .then((dataY)=>{
    //         res.json({
    //             matchesWon: dataM,
    //                 yearlyWins: dataY
    //         });
    //     });
    // });
    res.json({
        matchesWon: await plot2.getMatchesWon(),
        yearlyWins: await plot2.getYearlyWins()
    });
});
app.get('/api/plot3',async (req,res)=>{
    res.json(await plot3.getExtraRuns());
});
app.get('/api/plot4', async(req,res)=>{
    res.json({
        bowlers20: await plot4.getBowlers20(),
        econ20: await plot4.getEcon20()
    });
});
app.get('/api/plot5',async(req,res)=>{
    res.json(await plot5.getPlayerData());
});


app.listen(port, ()=>{
    console.log(`Server is listening to ${port}`)
    
})



  

  


  