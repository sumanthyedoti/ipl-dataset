fetch('api/plot2')
    .then(res => res.json())
    .then(json => {
        let matchesWon= json.matchesWon;
        let yearlyWins= json.yearlyWins;
        console.log(json);
        Highcharts.chart('container', {
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

