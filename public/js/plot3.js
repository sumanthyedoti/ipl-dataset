function fetchData(){
    return new Promise((resolve,reject)=>{
    fetch('api/plot3')
    .then(res => resolve(res.json()))
    })
}

async function showPlot(){
    
        let extraRuns = await fetchData();
        console.log(extraRuns);
        Highcharts.chart('plot3-container', {
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
                        fontSize: '12px',
                        fontWeight: ""
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
                name: 'Extra Runs',
                data: Object.values(extraRuns)
            }]
        });
document.getElementById("plot3-container").style.display = "block";
}

showPlot();

