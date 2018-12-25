function fetchData(){
    return new Promise((resolve,reject)=>{
    fetch('api/plot2')
    .then(res => resolve(res.json()))
    })
}

async function showPlot(){
    
        let json = await fetchData();
        let teams = json.teams;
        let yearlyWins = json.yearlyWins;
            console.log(json);
            matchesWon = teams.reduce((matchesWon, team) => {
                let wonMatchesObj = {};
                wonMatchesObj.name = team;
                let wonMatches = Object.keys(yearlyWins).reduce((wonMatches, year) => {
                    if (!yearlyWins[year].hasOwnProperty([team])) {
                        wonMatches.push("");
                    } else {
                        wonMatches.push(yearlyWins[year][team]);
                    }
                    return wonMatches;
                }, [])
                wonMatchesObj.data = wonMatches;
                matchesWon.push(wonMatchesObj);
                return matchesWon;
            }, []);
            Highcharts.chart("plot2-container", {
                chart: {
                    type: 'column',
                    zoomType: 'xy',
                    backgroundColor: "rgba(0,0,0,0.1)",
                    // borderColor:"black",
                    borderRadius: "20px",
                    borderWidth: 2,
                    borderColor: "#444",
                    marginTop: "150",
                    marginRight: "50",
                    plotBackgroundColor: '#fff',
                    plotShadow: true,
                    plotMargin: "20px"
                },
                title: {
                    text: 'Matches won by all teams over all the years of IPL',
                    style: {
                        color: 'darkbrown',
                        fontWeight: 'bold'
                    }
                },
                xAxis: {
                    categories: Object.keys(yearlyWins),
                    labels: {
                        style: {
                            color: 'black',
                            fontSize: '12px',
                            fontWeight: ""
                        }
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Matches Won'
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    },
                    labels: {
                        style: {
                            color: 'black',
                            fontSize: '12px',
                            fontWeight: ""
                        }
                    }
                },
                legend: {
                    align: 'right',
                    x: -40,
                    verticalAlign: 'top',
                    y: 40,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#fff',
                    borderColor: '#ddd',
                    borderWidth: 2,
                    shadow: true
                },
                tooltip: {
                    headerFormat: '<b>{point.x}</b><br/>',
                    pointFormat: '{series.name}: {point.y}'
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: true,
                            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                        }
                    }
                },
                series: matchesWon
            });
            console.log(matchesWon);
    document.getElementById("plot2-container").style.display = "block";

}

showPlot();

