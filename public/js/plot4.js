function fetchData(){
    return new Promise((resolve,reject)=>{
    fetch('api/plot4')
    .then(res => resolve(res.json()))
    })
}

async function showPlot(){
        let econ = await fetchData();
        console.log(econ);
        let bowlers20=Object.keys(econ).sort((a,b)=>{
            return econ[a]-econ[b];
        }).slice(0,20);
    
    let econ20 = bowlers20.map((bowler)=> econ[bowler]);
    Highcharts.chart('plot4-container', {
        chart: {
            type: 'column',
            zoomType: "",
            type: 'column',
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
                    fontSize: '12px',
                    fontWeight: ""
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
            name: 'Economy',
            data: econ20
        }]
    });
}


showPlot();

