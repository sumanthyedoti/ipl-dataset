const express = require('express');
const path = require('path');
const ejs = require('ejs');

const plot1 = require('./api/plot1');
const plot2 = require('./api/plot2');
const plot3 = require('./api/plot3');
const plot4 = require('./api/plot4');
const plot5 = require('./api/plot5');
const port = process.env.PORT || 3000;

let app = express();
app.set('view engine','ejs');
app.use(express.static(__dirname+'/public'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('/',(req,res)=>{
    res.render('plot.ejs',{
        title: 'IPL Dataset',
        plot: 1,
        plotTitle: 'Matches played per year'
    });
});
app.get('/plot1',(req,res)=>{
    res.render('plot.ejs',{
        title: 'IPL Dataset',
        plot: 1,
        plotTitle: 'Matches played per year'
    });
});
app.get('/plot2',(req,res)=>{
    res.render('plot.ejs',{
        title: 'IPL Dataset',
        plot: 2,
        plotTitle: 'Matches won by by all the team over all the years'
    });
});
app.get('/plot3',(req,res)=>{
    res.render('plot.ejs',{
        title: 'IPL Dataset',
        plot: 3,
        plotTitle: 'Extra run conceded per team in IPL-2016'
    });
});
app.get('/plot4',(req,res)=>{
    res.render('plot.ejs',{
        title: 'IPL Dataset',
        plot: 4,
        plotTitle: 'Top 20 economical bowlers in IPL-2015'
    });
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
    try{
        res.json({
            teams: await plot2.getTeams(),
            yearlyWins: await plot2.getYearlyWins()
        });
    }catch(err){
        console.log(err);
    }
});
app.get('/api/plot3',async (req,res)=>{
    res.json(await plot3.getExtraRuns());
});
app.get('/api/plot4', async(req,res)=>{
    res.json(await plot4.getEcon());
});
app.get('/api/plot5',async(req,res)=>{
    res.json(await plot5.getPlayerData());
});


app.listen(port, ()=>{
    console.log(`Server is listening to ${port}`)
    
})



  

  


  