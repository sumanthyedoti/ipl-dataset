var plotText = document.getElementsByClassName("plot-text1")[0];
plotText.addEventListener('click',showPlot1,false);

var plotText = document.getElementsByClassName("plot-text2")[0];
plotText.addEventListener('click',showPlot2,false);

var plotText = document.getElementsByClassName("plot-text3")[0];
plotText.addEventListener('click',showPlot3,false);

var plotText = document.getElementsByClassName("plot-text4")[0];
plotText.addEventListener('click',showPlot4,false);

function showPlot1(e){
fetch('api/plot1')
    .then(res => res.json())
    .then(json => {
       let matchesInYear= json;
        console.log(matchesInYear);
        Highcharts.chart('plot1-container', {
            chart: {
                type: 'column',
                //zoomType:"xy"
                type: 'column',
                //zoomType:'xy',
                backgroundColor:"rgba(0,0,0,0.1)",
                // borderColor:"black",
                borderRadius:"20px",
                borderWidth: 2,
                borderColor:"#444",
                marginTop:"100",
                marginRight:"50",
                plotBackgroundColor: '#fff',
                plotShadow: true,
                plotMargin:"20px"
            },
            title: {
                text: 'Matches played per year in IPL',
                style: {
                        color: 'darkbrown',
                        fontWeight: 'bold'
                    }
            },
            subtitle: {
                text: ""
            },
            xAxis: {
                categories: Object.keys(matchesInYear),
                title: {
                //text: "years"
                },
                labels: {
                    style: {
                        color: 'black',
                        fontSize:'12px',
                        fontWeight:""
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                text: 'Matches',
                align: 'middle'
                },
                labels: {
                overflow: 'justify',
                style: {
                        color: 'black',
                        fontSize:'12px',
                        fontWeight:""
                    }
                }
            },
            tooltip: {
                valueSuffix: ' '
            },
            plotOptions: {
                bar: {
                dataLabels: {
                    enabled: true
                }
                },
                column: {
                    states: {
                        hover: {
                            color: '#66ffff'                                                           
                        }
                    }
                },
            },
            
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 45,
                floating: true,
                borderWidth: 1,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: true
            },
            series: [{
                name: 'Matches',
                data: Object.values(matchesInYear)
            }]
            });
    document.getElementById("plot1-container").style.display="block";
    });

}

function showPlot2(e){
    fetch('api/plot2')
    .then(res => res.json())
    .then(json => {
        let matchesWon= json.matchesWon;
        let yearlyWins= json.yearlyWins;
        console.log(json);
        Highcharts.chart("plot2-container", {
            chart: {
                type: 'column',
                zoomType:'xy',
                backgroundColor:"rgba(0,0,0,0.1)",
                // borderColor:"black",
                borderRadius:"20px",
                borderWidth: 2,
                borderColor:"#444",
                marginTop:"150",
                marginRight:"50",
                plotBackgroundColor: '#fff',
                plotShadow: true,
                plotMargin:"20px"
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
                    fontSize:'12px',
                    fontWeight:""
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
                    fontSize:'12px',
                    fontWeight:""
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
            series:matchesWon
            });
            console.log(matchesWon);
    });
    document.getElementById("plot2-container").style.display="block";

}

function showPlot3(){
    fetch('api/plot3')
    .then(res => res.json())
    .then(json => {
        let extraRuns= json;
        console.log(json);
        Highcharts.chart('plot3-container', {
            chart: {
                type: 'column',
                //zoomType:"xy"
                 type: 'column',
                //zoomType:'xy',
                backgroundColor:"rgba(0,0,0,0.1)",
                // borderColor:"black",
                borderRadius:"20px",
                borderWidth: 2,
                borderColor:"#444",
                marginTop:"100",
                marginRight:"50",
                plotBackgroundColor: '#fff',
                plotShadow: true,
                plotMargin:"20px"
            }, title: {
                text: 'Extra runs conceded per team in the IPL-2016',
                style: {
                    color: 'darkbrown',
                    fontWeight: 'bold'
                }
            },
            subtitle: {
                text: ""
            },
            xAxis: {
                categories: Object.keys(extraRuns),
                title: {
                //text: "Teams"
                },
                labels: {
                style: {
                    color: 'black',
                    fontSize:'12px',
                    fontWeight:""
                }
                }
            },
            yAxis: {
                min: 0,
                title: {
                text: 'Extra Runs',
                align: 'middle'
                },
                labels: {
                overflow: 'justify',
                style: {
                    color: 'black',
                    fontSize:'12px',
                    fontWeight:""
                }
                }
            },
            tooltip: {
                valueSuffix: ' '
            },
            plotOptions: {
                bar: {
                dataLabels: {
                    enabled: true
                }
                },
                column: {
                    states: {
                        hover: {
                            color: '#66ffff'                                                           
                        }
                    }
                },
            },
        
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 45,
                floating: true,
                borderWidth: 1,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: true
            },
            series: [{
                name: 'Extra Runs',
                data: Object.values(extraRuns)
            }]
            });       
    });
    document.getElementById("plot3-container").style.display="block";
}

function showPlot4(){
    fetch('api/plot4')
    .then(res => res.json())
    .then(json => {
        let bowlers20= json.bowlers20;
        let econ20= json.econ20;
        console.log(json);
        Highcharts.chart('plot4-container', {
            chart: {
                type: 'column',
                zoomType:"",
                 type: 'column',
                backgroundColor:"rgba(0,0,0,0.1)",
                // borderColor:"black",
                borderRadius:"20px",
                borderWidth: 2,
                borderColor:"#444",
                marginTop:"100",
                marginRight:"50",
                plotBackgroundColor: '#fff',
                plotShadow: true,
                plotMargin:"20px"
            },
            title: {
                text: 'Top 20 economical bowlers in IPL-2015',
                style: {
                    color: 'darkbrown',
                    fontWeight: 'bold'
                }
            },
            subtitle: {
                text: ""
            },
            xAxis: {
                categories: bowlers20,
                title: {
                //text: "Teams"
                },
                labels: {
                style: {
                    color: 'black',
                    fontSize:'12px',
                    fontWeight:""
                }
                }
            },
            yAxis: {
                min: 0,
                title: {
                text: 'Economy',
                align: 'middle'
                },
                labels: {
                overflow: 'justify',
                style: {
                    color: 'black',
                    fontSize:'12px',
                    fontWeight:""
                }
                }
            },
            tooltip: {
                valueSuffix: ' '
            },
            plotOptions: {
                bar: {
                dataLabels: {
                    enabled: true
                }
                },
                column: {
                    states: {
                        hover: {
                            color: '#66ffff'                                                           
                        }
                    }
                },
            },
        
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 45,
                floating: true,
                borderWidth: 1,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: true
            },
            series: [{
                name: 'Economy',
                data: econ20
            }]
            });       
    });
    document.getElementById("plot4-container").style.display="block";
}

document.addEventListener("keyup", closeCreateListPop, false);
    
function closeCreateListPop(e){
    if(e.keyCode === 27 || e.type=="click"){
        let plotDivs = document.getElementsByClassName("container");
        [...plotDivs].forEach((e)=>{
            e.style.display="none";
        })
    }
}