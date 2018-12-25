function fetchData(){
    return new Promise((resolve,reject)=>{
    fetch('api/plot1')
    .then(res => resolve(res.json()))
    })
}

async function showPlot(){
    
        let matchesInYear = await fetchData();
        console.log(matchesInYear);
        Highcharts.chart('plot1-container', {
            chart: {
                type: 'column',
                //zoomType:"xy"
                type: 'column',
                //zoomType:'xy',
                backgroundColor: "rgba(0,0,0,0.1)",
                // borderColor:"black",
                borderRadius: "20px",
                borderWidth: 2,
                borderColor: "#444",
                marginTop: "100",
                marginRight: "50",
                plotBackgroundColor: '#fff',
                plotShadow: true,
                plotMargin: "20px"
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
                        fontSize: '12px',
                        fontWeight: ""
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
                        fontSize: '12px',
                        fontWeight: ""
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
        document.getElementById("plot1-container").style.display = "block";
}

showPlot();

